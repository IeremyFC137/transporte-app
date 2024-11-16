'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation' // Importa el hook de query params
import Link from 'next/link'
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import { useUsuario } from '../../hooks/useUsuario'
import {
  DirectionsCar,
  Badge,
  AccountBalanceWallet,
  ArrowBack,
} from '@mui/icons-material'

export const VehiculoForm = () => {
  const { registerAuto, autoLoading, autoError, autoData } = useUsuario() // Usar el hook `useUsuario`
  const searchParams = useSearchParams() // Obtener los parámetros de búsqueda
  const id_chofer = searchParams.get('id_chofer') // Extraer el id_chofer del query param

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    patente: '',
    marca: '',
    modelo: '',
    capacidad: '',
    capacidad_maletas: '',
    costo_asiento: '',
    id_chofer: '',
    tipo_vehiculo: '0', // Inicializar vacío hasta que se obtenga el query param
  })

  // Actualizar el id_chofer en el estado una vez que esté disponible
  useEffect(() => {
    if (id_chofer) {
      setFormData((prevData) => ({
        ...prevData,
        id_chofer,
      }))
    }
  }, [id_chofer])

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
    await registerAuto(formData) // Llamar al método del hook con los datos del formulario
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Box
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        sx={{ width: 400 }}
      >
        {/* Título del formulario */}
        <Typography
          variant="h5"
          component="h1"
          className="text-center font-bold text-gray-800 mb-6"
        >
          Registro de Vehículo
        </Typography>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="text-gray-500" />
            <TextField
              label="Patente"
              name="patente"
              value={formData.patente}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese la patente"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <DirectionsCar className="text-gray-500" />
            <TextField
              label="Marca"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese la marca"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <DirectionsCar className="text-gray-500" />
            <TextField
              label="Modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese el modelo"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <DirectionsCar className="text-gray-500" />
            <TextField
              label="Capacidad de Asientos"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese la capacidad de asientos"
              type="number"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <DirectionsCar className="text-gray-500" />
            <TextField
              label="Capacidad de Maletas"
              name="capacidad_maletas"
              value={formData.capacidad_maletas}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese la capacidad de maletas"
              type="number"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <AccountBalanceWallet className="text-gray-500" />
            <TextField
              label="Costo por Asiento"
              name="costo_asiento"
              value={formData.costo_asiento}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ingrese el costo por asiento"
              type="number"
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-2"
            disabled={autoLoading || autoData} // Desactivar el botón mientras se realiza el registro
          >
            {autoLoading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>

        {autoError && (
          <Typography variant="body2" className="mt-2 text-center text-red-600">
            {autoError}
          </Typography>
        )}

        {autoData && (
          <Typography
            variant="body2"
            className="mt-2 text-center text-green-600"
          >
            Vehículo registrado con éxito.
          </Typography>
        )}
      </Box>
    </div>
  )
}
