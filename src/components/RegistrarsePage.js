'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'

export const RegistrarsePage = () => {
  const [userType, setUserType] = useState('') // Tipo de usuario seleccionado

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Box
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
        sx={{ width: 400 }}
      >
        <Typography
          variant="h5"
          component="h1"
          className="text-center font-bold text-gray-800 mb-4"
        >
          Registrarse
        </Typography>

        <Typography
          variant="body1"
          className="text-gray-700 mb-2"
          align="center"
        >
          Seleccione el tipo de usuario que desea registrar:
        </Typography>

        <Select
          fullWidth
          value={userType}
          onChange={handleUserTypeChange}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Elija una opción
          </MenuItem>
          <MenuItem value="cliente">Cliente</MenuItem>
          <MenuItem value="conductor">Conductor</MenuItem>
        </Select>

        {userType && (
          <Link
            href={
              userType === 'cliente'
                ? '/registrar/cliente'
                : '/registrar/conductor'
            }
            className="mt-4 block"
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Continuar
            </Button>
          </Link>
        )}

        {/* Enlace para iniciar sesión */}
        <Typography variant="body2" className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/iniciar-sesion"
            className="text-blue-600 hover:underline"
          >
            Iniciar sesión
          </Link>
        </Typography>
      </Box>
    </div>
  )
}
