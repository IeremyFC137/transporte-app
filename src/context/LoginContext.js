'use client'

import React, { createContext, useContext } from 'react'
import { useLogin as useLoginHook } from '../hooks/useLogin'

// Crear el contexto
const LoginContext = createContext()

// Proveedor del contexto
export function LoginProvider({ children }) {
  // Usa el hook personalizado para manejar el login y obtener vehículos
  const {
    loginData,
    login,
    logout,
    loading,
    error,
    vehiculos,
    vehiculosCargados, // Nueva bandera para verificar si ya se cargaron los vehículos
    fetchVehiculos,
  } = useLoginHook()

  return (
    <LoginContext.Provider
      value={{
        loginData,
        login,
        logout,
        loading,
        error,
        vehiculos, // Lista de vehículos
        vehiculosCargados, // Bandera que indica si los vehículos ya fueron cargados
        fetchVehiculos, // Método para obtener vehículos
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

// Hook para usar el contexto
export function useLoginContext() {
  return useContext(LoginContext)
}
