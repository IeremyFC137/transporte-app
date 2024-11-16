'use client'

import React, { createContext, useContext } from 'react'
import { useReserva as useReservaHook } from '../hooks/useReserva'

// Crear el contexto
const ReservaContext = createContext()

// Proveedor del contexto
export function ReservaProvider({ children }) {
  // Usa el hook personalizado para manejar reservas y equipajes
  const reservaHook = useReservaHook()

  return (
    <ReservaContext.Provider value={reservaHook}>
      {children}
    </ReservaContext.Provider>
  )
}

// Hook para usar el contexto
export function useReservaContext() {
  const context = useContext(ReservaContext)
  if (!context) {
    throw new Error('useReservaContext must be used within a ReservaProvider')
  }
  return context
}
