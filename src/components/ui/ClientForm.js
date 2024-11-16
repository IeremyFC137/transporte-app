'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUsuario } from '../../hooks/useUsuario' // Importar el hook personalizado
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import {
  AccountCircle,
  Email,
  Phone,
  Badge,
  ArrowBack,
} from '@mui/icons-material'

export const ClientForm = () => {
  const { registerClient, loading, error, usuarioData } = useUsuario() // Usar el hook personalizado

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono_movil: '',
    tipo_cliente: '1', // Valor predeterminado para tipo_cliente
  })

  // Manejar cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault()
    await registerClient(formData) // Llamar al método del hook
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Box
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        sx={{ width: 400 }}
      >
        {/* Botón para ir atrás */}
        <Link href="/registrar">
          <IconButton className="absolute top-4 left-4" aria-label="Volver">
            <ArrowBack />
          </IconButton>
        </Link>

        {/* Título del formulario */}
        <Typography
          variant="h5"
          component="h1"
          className="text-center font-bold text-gray-800 mb-6"
        >
          Registro de Cliente
        </Typography>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <Badge className="text-gray-500" />
            <TextField
              label="RUT"
              variant="outlined"
              fullWidth
              placeholder="Ingrese su RUT"
              name="rut"
              value={formData.rut} // Accede al valor actual
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <AccountCircle className="text-gray-500" />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              placeholder="Ingrese su nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <AccountCircle className="text-gray-500" />
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              placeholder="Ingrese su apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <Email className="text-gray-500" />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              placeholder="Ingrese su email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-gray-500" />
            <TextField
              label="Teléfono móvil"
              variant="outlined"
              fullWidth
              placeholder="Ingrese su número"
              type="tel"
              name="telefono_movil"
              value={formData.telefono_movil}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-2"
            disabled={loading || usuarioData} // Desactivar el botón mientras se realiza el registro
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>

        {/* Mostrar errores o confirmación */}
        {error && (
          <Typography variant="body2" className="mt-2 text-center text-red-600">
            {error}
          </Typography>
        )}
        {usuarioData && (
          <Typography
            variant="body2"
            className="mt-2 text-center text-green-600"
          >
            Usuario registrado con éxito. Tu id es{' '}
            {`${usuarioData.id_cliente}.`}
          </Typography>
        )}
      </Box>
    </div>
  )
}
