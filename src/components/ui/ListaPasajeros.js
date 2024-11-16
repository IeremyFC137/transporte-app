'use client'

import { useEffect, useState } from 'react'
import { useUsuario } from '../../hooks/useUsuario'
import { useLoginContext } from '../../context/LoginContext'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'

export const ListaPasajeros = () => {
  const { loginData, logout } = useLoginContext()
  const router = useRouter()
  const {
    getPasajeros,
    pasajerosData,
    pasajerosLoading,
    pasajerosError,
    getReserva,
    updateReservaStatus,
    updateConductorAvailability, // Método para actualizar la disponibilidad del conductor
  } = useUsuario()

  const [selectedPasajero, setSelectedPasajero] = useState(null)
  const [hasFetchedPasajeros, setHasFetchedPasajeros] = useState(false)
  const [reservas, setReservas] = useState([])
  const [reservaLoading, setReservaLoading] = useState(false)
  const [hasFetchedReservas, setHasFetchedReservas] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    if (!loginData) {
      router.replace('/')
    }
  }, [loginData, router])

  // Obtener la lista de pasajeros
  useEffect(() => {
    const fetchPasajeros = async () => {
      if (loginData?.id_chofer && !hasFetchedPasajeros) {
        setHasFetchedPasajeros(true)
        await getPasajeros(loginData.id_chofer)
      }
    }
    fetchPasajeros()
  }, [loginData?.id_chofer, hasFetchedPasajeros, getPasajeros])

  // Obtener las reservas basadas en los pasajeros
  useEffect(() => {
    const fetchReservas = async () => {
      if (pasajerosData && pasajerosData.length > 0 && !hasFetchedReservas) {
        setReservaLoading(true)
        const reservasArray = []
        for (const pasajero of pasajerosData) {
          const reserva = await getReserva(pasajero.id_reserva)
          reservasArray.push({
            ...reserva,
            id_reserva: pasajero.id_reserva,
            estadoPasajero: pasajero.estado,
          })
        }
        setReservas(reservasArray)
        setReservaLoading(false)
        setHasFetchedReservas(true)
      }
    }
    fetchReservas()
  }, [pasajerosData, getReserva, hasFetchedReservas])

  // Manejar la selección de un pasajero
  const handleChange = (event) => {
    setSelectedPasajero(event.target.value)
  }

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedPasajero) return

    try {
      setConfirming(true)

      // Actualizar estado de la reserva seleccionada
      await updateReservaStatus(selectedPasajero)

      // Verificar si hay solo una reserva pendiente de atender
      const reservasPendientes = reservas.filter(
        (reserva) => reserva.estadoPasajero !== 'atendido'
      )

      if (reservasPendientes.length === 1) {
        // Actualizar disponibilidad del conductor
        await updateConductorAvailability(loginData.id_chofer)
      }

      // Logout y redirigir
      logout()
      router.replace('/')
    } catch (err) {
      console.error('Error al confirmar el recojo:', err)
    } finally {
      setConfirming(false)
    }
  }

  if (!loginData) {
    return null
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Box
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        sx={{ width: 400 }}
      >
        <Typography
          variant="h5"
          component="h1"
          className="text-center font-bold text-gray-800 mb-6"
        >
          Lista de Pasajeros
        </Typography>

        {/* Mostrar mensaje de carga */}
        {(pasajerosLoading || reservaLoading || confirming) && (
          <CircularProgress color="primary" className="block mx-auto" />
        )}

        {/* Mostrar mensaje de error */}
        {pasajerosError && (
          <Alert severity="error" className="mb-4">
            {pasajerosError}
          </Alert>
        )}

        {/* Mostrar el formulario si hay datos */}
        {reservas.length > 0 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl component="fieldset">
              <RadioGroup value={selectedPasajero} onChange={handleChange}>
                {reservas
                  .filter((reserva) => reserva.estadoPasajero !== 'atendido') // Filtrar reservas con estado diferente a 'atendido'
                  .map((reserva, index) => (
                    <FormControlLabel
                      key={`${reserva.id_reserva}-${index}`}
                      value={reserva.id_reserva}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {reserva.estadoPasajero}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Fecha de reserva:{' '}
                            {reserva.hora_reserva
                              ? format(
                                  new Date(
                                    new Date().setHours(
                                      ...reserva.hora_reserva
                                        .split(':')
                                        .map((v, i) =>
                                          i < 2 ? parseInt(v) : parseFloat(v)
                                        )
                                    )
                                  ),
                                  'dd/MM/yyyy HH:mm:ss'
                                )
                              : 'Hora no disponible'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Dirección: {reserva.direccion_inicio}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={
                !selectedPasajero ||
                pasajerosLoading ||
                reservaLoading ||
                confirming
              }
            >
              {confirming ? 'Confirmando...' : 'Confirmar Recojo'}
            </Button>
          </form>
        )}
      </Box>
    </div>
  )
}
