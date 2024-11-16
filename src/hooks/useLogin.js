'use client'

import { useState, useCallback } from 'react'
import { iniciarSesion } from '../lib/iniciarSesion'
import { obtenerVehiculos } from '../lib/obtenerVehiculos'

export function useLogin() {
  const [loginData, setLoginData] = useState(null) // Datos de respuesta del login
  const [loading, setLoading] = useState(false) // Estado de carga
  const [error, setError] = useState(null) // Estado de error
  const [vehiculos, setVehiculos] = useState([]) // Estado para los vehículos
  const [vehiculosCargados, setVehiculosCargados] = useState(false) // Flag para evitar múltiples fetches

  // Método para manejar el login
  const login = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await iniciarSesion(data) // Llamar a la función desde lib
      setLoginData(response) // Guardar la respuesta
      return response // Retorna la respuesta al componente que lo llama
    } catch (err) {
      console.error('Error en login:', err.message)
      setError(err.message)
      throw err // Relanzar el error para manejo en el componente
    } finally {
      setLoading(false)
    }
  }

  // Método para cerrar sesión
  const logout = () => {
    setLoginData(null) // Eliminar los datos de sesión
    setVehiculos([]) // Limpiar los vehículos al cerrar sesión
    setVehiculosCargados(false) // Reiniciar el estado de vehículos cargados
  }

  // Método para obtener vehículos
  const fetchVehiculos = useCallback(async () => {
    if (vehiculosCargados) return // Si los vehículos ya están cargados, no hagas nada

    setLoading(true)
    setError(null)

    try {
      const vehiculosData = await obtenerVehiculos() // Llamar a la función desde lib
      setVehiculos(vehiculosData) // Guardar los vehículos obtenidos
      setVehiculosCargados(true) // Marcar como cargados
    } catch (err) {
      console.error('Error al obtener vehículos:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [vehiculosCargados])

  return {
    loginData, // Datos del login exitoso
    loading, // Estado de carga
    error, // Error si ocurre
    vehiculos, // Lista de vehículos obtenidos
    vehiculosCargados, // Estado de vehículos cargados
    login, // Método para iniciar sesión
    logout, // Método para cerrar sesión
    fetchVehiculos, // Método para obtener vehículos
  }
}
