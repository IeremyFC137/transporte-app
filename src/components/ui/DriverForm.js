'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Importar useRouter para manejar la redirección
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import { useUsuario } from '../../hooks/useUsuario'
import {
  AccountCircle,
  Language,
  Email,
  Phone,
  Badge,
  ArrowBack,
} from '@mui/icons-material'

export const DriverForm = () => {
  const { registerChofer, loading, error, usuarioData } = useUsuario() // Usar el hook personalizado
  const router = useRouter() // Instancia del router para redirección

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    rut: '',
    nombre_chofer: '',
    apellido_chofer: '',
    idiomas: '',
    telefono_movil: '',
    email: '',
    tipo_cliente: '1', // Valor predeterminado para tipo_cliente
  })

  const [registrationComplete, setRegistrationComplete] = useState(false) // Estado para controlar si se completó el registro

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
    try {
      const response = await registerChofer(formData) // Llamar al método del hook
      if (response && response.id_chofer) {
        setRegistrationComplete(true) // Marcar como registro completado
      } else {
        console.error('No se recibió un id_chofer válido en la respuesta.')
      }
    } catch (err) {
      console.error('Error al registrar el conductor:', err)
    }
  }

  // Manejar el clic en "Continuar"
  const handleContinue = () => {
    if (usuarioData && usuarioData.id_chofer) {
      router.push(
        `/registrar/conductor/vehiculo?id_chofer=${usuarioData.id_chofer}`
      )
    }
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
          Registro de Conductor
        </Typography>

        {/* Formulario */}
        {!registrationComplete ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="text-gray-500" />
              <TextField
                label="RUT"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su RUT"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <AccountCircle className="text-gray-500" />
              <TextField
                label="Nombre"
                name="nombre_chofer"
                value={formData.nombre_chofer}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su nombre"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <AccountCircle className="text-gray-500" />
              <TextField
                label="Apellido"
                name="apellido_chofer"
                value={formData.apellido_chofer}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su apellido"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Language className="text-gray-500" />
              <TextField
                label="Idioma"
                name="idiomas"
                value={formData.idiomas}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su idioma"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-gray-500" />
              <TextField
                label="Teléfono móvil"
                name="telefono_movil"
                value={formData.telefono_movil}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su número"
                type="tel"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Email className="text-gray-500" />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Ingrese su email"
                type="email"
                required
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="py-2"
              disabled={loading} // Desactivar el botón mientras se realiza el registro
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
          </form>
        ) : (
          <>
            <Typography
              variant="body2"
              className="mt-4 text-center text-green-600"
            >
              Usuario registrado con éxito. Tu id es{' '}
              {`${usuarioData.id_chofer}.`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="py-2 mt-4"
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </>
        )}
        {error && (
          <Typography variant="body2" className="mt-2 text-center text-red-600">
            {error}
          </Typography>
        )}
      </Box>
    </div>
  )
}
