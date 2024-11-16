'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginContext } from '../context/LoginContext'
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import Link from 'next/link'

export const LoginPage = () => {
  const { login, loading, error } = useLoginContext() // Usa el contexto
  const [formData, setFormData] = useState({ id: '', tipo_usuario: '' })
  const router = useRouter()

  // Manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const loginResponse = await login(formData)
      if (loginResponse) {
        router.push('/') // Redirigir al Home
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Box className="p-8 bg-white shadow-md rounded-lg" sx={{ width: 400 }}>
        <div className="flex flex-col items-center my-5">
          <LockOutlined className="text-gray-600 mb-2" fontSize="large" />
          <Typography variant="h5" className="font-semibold mb-4">
            Iniciar Sesión
          </Typography>
        </div>

        {/* Formulario */}
        <form className="space-y-4 mb-5" onSubmit={handleSubmit}>
          {/* Campo de ID */}
          <TextField
            label="ID de sesión"
            type="text"
            fullWidth
            variant="outlined"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
          />

          {/* Campo de Tipo de Usuario */}
          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="tipo-usuario-label">Tipo de Usuario</InputLabel>
            <Select
              labelId="tipo-usuario-label"
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleInputChange}
              label="Tipo de Usuario"
            >
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Chofer">Chofer</MenuItem>
            </Select>
          </FormControl>

          {/* Botón de envío */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Log In'}
          </Button>
        </form>

        {/* Mensaje de error */}
        {error && (
          <Typography
            variant="body2"
            align="center"
            className="mt-2 text-red-600"
          >
            {error}
          </Typography>
        )}

        {/* Enlace para registrarse */}
        <Typography
          variant="body2"
          align="center"
          className="mt-4 text-gray-600"
        >
          ¿No tienes cuenta?{' '}
          <Link href="/registrar" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </Typography>
      </Box>
    </div>
  )
}
