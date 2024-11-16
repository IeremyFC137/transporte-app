'use client'

import React from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

import { useLoginContext } from '../../context/LoginContext' // Usa el contexto en lugar del hook personalizado

export default function Navbar() {
  const { loginData, logout } = useLoginContext() // Contexto global para login

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
      <Toolbar>
        {/* Logo con redirección a la página principal */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            AirPorter
          </Link>
        </Typography>

        <Box>
          {/* Mostrar opciones de registro/inicio de sesión solo si no hay loginData */}
          {!loginData ? (
            <>
              <Link href="/registrar" passHref>
                <Button color="inherit" sx={{ marginRight: 2 }}>
                  Registrarse
                </Button>
              </Link>
              <Link href="/iniciar-sesion" passHref>
                <Button color="inherit">Iniciar Sesión</Button>
              </Link>
            </>
          ) : (
            /* Botón para cerrar sesión */
            <Button color="inherit" onClick={logout}>
              Cerrar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
