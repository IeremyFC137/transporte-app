'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Button, Paper } from '@mui/material'

import { useLoginContext } from '../../context/LoginContext'
import { useReservaContext } from '../../context/ReservaContext' // Usar el contexto de reserva

export const ReservaForm2 = () => {
  const { loginData } = useLoginContext()
  const { postEquipaje, equipajeLoading, reservaResponse, equipajeError } =
    useReservaContext() // Usar el contexto de reserva
  const router = useRouter()

  const [formData, setFormData] = useState({
    peso: '',
    volumen: '',
  })

  const [equipajes, setEquipajes] = useState([]) // Lista de equipajes registrados

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

  // Manejar envío del equipaje actual
  const handleAddEquipaje = async (e) => {
    e.preventDefault()

    try {
      const { volumen, peso } = formData
      const result = await postEquipaje({
        id_reserva: reservaResponse.id_reserva,
        peso,
        volumen,
      })

      // Agregar el equipaje registrado a la lista local
      setEquipajes((prev) => [...prev, { peso, volumen }])
      setFormData({ peso: '', volumen: '' }) // Limpiar el formulario

      console.log('Equipaje enviado exitosamente:', result)
    } catch (err) {
      console.error('Error al enviar el equipaje:', err)
    }
  }

  // Manejar redirección al siguiente paso
  const handleNext = () => {
    router.push('/cliente/reservar/3')
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
          Registro de Equipajes
        </Typography>

        {/* Formulario para registrar equipaje */}
        <form onSubmit={handleAddEquipaje}>
          <TextField
            label="Peso en gramos"
            variant="outlined"
            fullWidth
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            type="number"
            required
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Volumen en m³"
            variant="outlined"
            fullWidth
            name="volumen"
            value={formData.volumen}
            onChange={handleInputChange}
            type="number"
            required
            sx={{ marginBottom: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={equipajeLoading}
            sx={{ marginBottom: 2 }}
          >
            {equipajeLoading ? 'Enviando...' : 'Agregar Equipaje'}
          </Button>
          {equipajeError && (
            <Typography color="error">{equipajeError}</Typography>
          )}
        </form>

        {/* Lista de equipajes registrados */}
        <Typography
          variant="h6"
          sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold' }}
        >
          Equipajes Registrados:
        </Typography>
        <ul>
          {equipajes.map((equipaje, index) => (
            <li key={index}>
              Peso: {equipaje.peso} gramos, Volumen: {equipaje.volumen} m³
            </li>
          ))}
        </ul>

        {/* Botón para ir al siguiente paso */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleNext}
          disabled={equipajeLoading}
          sx={{ marginTop: 4 }}
        >
          Siguiente
        </Button>
      </Paper>
    </Box>
  )
}
