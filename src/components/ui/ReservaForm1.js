'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Button, Paper } from '@mui/material'
import { useLoginContext } from '../../context/LoginContext'
import { useReservaContext } from '../../context/ReservaContext' // Importar el contexto de reserva

export const ReservaForm1 = () => {
  const { postReserva, reservaLoading, reservaError } = useReservaContext() // Usar el contexto para manejar las reservas
  const { loginData } = useLoginContext()
  const router = useRouter()

  const [formData, setFormData] = useState({
    direccion: '',
    pasajeros: '',
  })

  // Redirigir si no hay login
  useEffect(() => {
    if (!loginData) {
      router.replace('/')
    }
  }, [loginData, router])

  // Manejar cambios de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = async (e, redirectTo) => {
    e.preventDefault()

    // Validar campos requeridos
    if (!formData.direccion || !formData.pasajeros) {
      console.error('Por favor completa todos los campos obligatorios.')
      return
    }

    try {
      const { direccion, pasajeros } = formData
      // Enviar la reserva usando postReserva
      const result = await postReserva({
        id_cliente: loginData.id_cliente,
        direccion,
        pasajeros,
      })

      console.log('Reserva enviada exitosamente:', result)
      // Redirigir según el botón presionado
      router.push(redirectTo)
    } catch (err) {
      console.error('Error al enviar la reserva:', reservaError)
    }
  }

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

        {/* Formulario */}
        <form>
          <TextField
            label="Dirección de recojo"
            variant="outlined"
            fullWidth
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Cantidad de pasajeros"
            variant="outlined"
            fullWidth
            name="pasajeros"
            value={formData.pasajeros}
            onChange={handleInputChange}
            type="number"
            required
            sx={{ marginBottom: 3 }}
          />
          <div className="flex flex-row space-x-5">
            <Button
              variant="contained"
              fullWidth
              disabled={reservaLoading}
              onClick={(e) => handleSubmit(e, '/cliente/reservar/2')} // Ruta para "Con equipaje"
            >
              {reservaLoading ? 'Enviando...' : 'Con equipaje'}
            </Button>
            <Button
              variant="contained"
              fullWidth
              disabled={reservaLoading}
              onClick={(e) => handleSubmit(e, '/cliente/reservar/3')} // Ruta para "Sin equipaje"
            >
              {reservaLoading ? 'Enviando...' : 'Sin equipaje'}
            </Button>
          </div>
          {reservaError && (
            <Typography color="error">{reservaError}</Typography>
          )}
        </form>
      </Paper>
    </Box>
  )
}
