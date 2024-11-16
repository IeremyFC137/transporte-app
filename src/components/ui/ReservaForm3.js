'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Alert,
} from '@mui/material'

import { useLoginContext } from '../../context/LoginContext'
import { useReservaContext } from '@/context/ReservaContext'

export const ReservaForm3 = () => {
  const { loginData, logout, vehiculos } = useLoginContext() // Usar vehículos desde el contexto
  const {
    postReservarAuto,
    reservaResponse,
    autoLoading,
    autoError,
    postActualizarAsientos,
    postDescargarRecibo,
  } = useReservaContext() // Usar el hook de reserva
  const router = useRouter()

  const [formData, setFormData] = useState({
    vehiculoSeleccionado: '',
  })

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [noVehiclesMessage, setNoVehiclesMessage] = useState(false) // Mensaje para "no hay autos disponibles"

  // Redirigir si no hay login
  useEffect(() => {
    if (!loginData) {
      router.replace('/')
    }
  }, [loginData, router])

  // Manejar selección de vehículo
  const handleVehiculoSeleccionado = (e) => {
    setFormData((prev) => ({
      ...prev,
      vehiculoSeleccionado: e.target.value,
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar campos requeridos
    if (!formData.vehiculoSeleccionado) {
      console.error('Por favor completa todos los campos obligatorios.')
      return
    }

    try {
      const { vehiculoSeleccionado } = formData

      // Reservar auto
      const result = await postReservarAuto({
        id_chofer: vehiculoSeleccionado,
        id_reserva: reservaResponse.id_reserva,
        id_cliente: loginData.id_cliente,
      })

      // Actualizar asientos
      const result2 = await postActualizarAsientos({
        id_chofer: vehiculoSeleccionado,
        cant_pasajeros:
          parseInt(reservaResponse.cant_pasajeros, 10) +
          parseInt(
            vehiculos.find(
              (vehiculo) => vehiculo.choferId == formData.vehiculoSeleccionado
            ).tipoVehiculo,
            10
          ),
      })
      const result3 = await postDescargarRecibo({
        id_reserva: reservaResponse.id_reserva,
        id_cliente: loginData.id_cliente,
        costo_servicio: '0',
        costo_total: '0',
      })

      console.log('Reserva enviada exitosamente:', result)
      console.log('result 2:', result2)
      console.log('result 2:', result3)

      // Mostrar mensaje de éxito
      setShowSuccessMessage(true)

      // Logout y redirigir después de 3 segundos
      setTimeout(() => {
        logout()
        router.push('/')
      }, 3000)
    } catch (err) {
      console.error('Error al enviar la reserva:', err)
    }
  }

  // Verificar si hay vehículos disponibles
  const vehiculosDisponibles = vehiculos.filter((vehiculo) => {
    const capacidadRestante =
      parseInt(vehiculo.capacidad, 10) - parseInt(vehiculo.tipoVehiculo, 10) >=
      parseInt(reservaResponse?.cant_pasajeros || 0, 10)
    return capacidadRestante
  })

  useEffect(() => {
    if (vehiculos.length > 0 && vehiculosDisponibles.length === 0) {
      // Mostrar mensaje de "No hay autos disponibles" y redirigir después de 3 segundos
      setNoVehiclesMessage(true)
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [vehiculos, vehiculosDisponibles, router])

  // Si no hay loginData, no renderiza el formulario
  if (!loginData) {
    return null
  }

  return (
    <Box
      sx={{
        padding: 3,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 700,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
          padding: 4,
          marginTop: 4,
        }}
      >
        {/* Título */}
        <Typography
          variant="h5"
          component="h1"
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 4 }}
        >
          Reserva
        </Typography>

        {/* Mensaje de "No hay autos disponibles" */}
        {noVehiclesMessage && (
          <Alert severity="warning" sx={{ marginBottom: 2 }}>
            No hay autos disponibles en este momento. Redirigiendo...
          </Alert>
        )}

        {/* Mensaje de Éxito */}
        {showSuccessMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            ¡Reserva realizada con éxito!
          </Alert>
        )}

        {/* Mensaje de Error */}
        {autoError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {autoError}
          </Alert>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Vehículos */}
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Vehículos disponibles:
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={formData.vehiculoSeleccionado}
              onChange={handleVehiculoSeleccionado}
            >
              {vehiculosDisponibles.map((vehiculo) => (
                <FormControlLabel
                  key={vehiculo.id_auto || `vehiculo-${vehiculo.marca}`}
                  value={vehiculo.choferId}
                  control={<Radio />}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">
                        Marca/Modelo: {vehiculo.marca}/{vehiculo.modelo}
                      </Typography>
                      <Typography variant="body2">
                        Patente: {vehiculo.patente}
                      </Typography>
                      <Typography variant="body2">
                        Capacidad Máxima: {vehiculo.capacidad} pasajeros
                      </Typography>
                      <Typography variant="body2">
                        Asientos reservados: {vehiculo.tipoVehiculo}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    width: '100%',
                    marginBottom: 2,
                    backgroundColor: '#e3e5e8',
                    borderRadius: 1,
                    padding: 1,
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Botón de enviar reserva */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              autoLoading ||
              vehiculosDisponibles.length === 0 ||
              showSuccessMessage
            } // Deshabilitar si el fetch es exitoso
          >
            {showSuccessMessage
              ? 'Reserva Exitosa'
              : vehiculosDisponibles.length === 0
              ? 'Sin autos disponibles'
              : autoLoading
              ? 'Enviando...'
              : 'Enviar Reserva'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
