'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { FlightTakeoff } from '@mui/icons-material'
import { useLoginContext } from '../context/LoginContext'

export function HomePage() {
  const { loginData, fetchVehiculos, vehiculosCargados } = useLoginContext() // Incluir `vehiculosCargados` del contexto
  const router = useRouter()

  // Realizar prefetch de vehículos si `loginData` existe y aún no se han cargado
  useEffect(() => {
    if (loginData && !vehiculosCargados) {
      fetchVehiculos()
    }
  }, [loginData, vehiculosCargados, fetchVehiculos])

  // Redirección al presionar el botón
  const handleReservarClick = () => {
    router.push('/cliente/reservar/1') // Redirección inmediata
    if (!vehiculosCargados) {
      fetchVehiculos() // Realizar el fetch en segundo plano si aún no se ha hecho
    }
  }

  const handleListaPasajerosClick = () => {
    router.push('/conductor/lista-pasajeros') // Redirección a la lista de pasajeros
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Box
        className="text-center bg-white p-6 rounded-lg shadow-md"
        sx={{
          maxWidth: 600,
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {loginData ? (
          <>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#1565c0' }}
            >
              ¡Bienvenido de nuevo,{' '}
              {loginData.id_cliente
                ? loginData.nombre
                : loginData.id_chofer
                ? loginData.nombre_chofer
                : 'Usuario'}
              !
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4, color: '#555' }}>
              Aquí están los detalles de tu sesión:
            </Typography>
            <pre className="bg-gray-100 p-4 rounded-md text-left">
              {JSON.stringify(loginData, null, 2)}
            </pre>
            {/* Botón para "Reservar Auto" si el usuario es cliente */}
            {loginData.tipo_cliente === '1' && (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 4 }}
                fullWidth
                onClick={handleReservarClick} // Redirección y fetch simultáneo
              >
                Reservar Auto
              </Button>
            )}
            {/* Botón para "Lista de Pasajeros" si el usuario es conductor */}
            {loginData.id_chofer && (
              <Button
                variant="contained"
                sx={{ marginTop: 4 }}
                fullWidth
                onClick={handleListaPasajerosClick} // Redirección a lista de pasajeros
              >
                Ver Lista de Pasajeros
              </Button>
            )}
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#1565c0' }}
            >
              Bienvenido a AirPorter
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4, color: '#555' }}>
              La forma más fácil y rápida de gestionar tus viajes. ¡Explora
              nuestros servicios y comienza tu experiencia ahora!
            </Typography>
            <IconButton
              sx={{ color: '#1565c0', fontSize: 50 }}
              aria-label="viaje"
            >
              <FlightTakeoff fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Box>
    </div>
  )
}
