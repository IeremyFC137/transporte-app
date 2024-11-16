'use client'

import { useState } from 'react'
import { registrarCliente } from '../lib/registrarCliente'
import { registrarChofer } from '../lib/registrarConductor'
import { registrarAuto } from '../lib/registrarAuto'
import { obtenerPasajeros } from '../lib/obtenerPasajeros'
import { obtenerReserva } from '../lib/obtenerReserva'
import { actualizarEstadoReserva } from '../lib/actualizarEstadoReserva'
import { actualizarDisponibilidadConductor } from '../lib/actualizarDisponibilidadConductor' // Importa la nueva función

export function useUsuario() {
  const [usuarioData, setUsuarioData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [autoData, setAutoData] = useState(null)
  const [autoLoading, setAutoLoading] = useState(false)
  const [autoError, setAutoError] = useState(null)

  const [pasajerosData, setPasajerosData] = useState(null)
  const [pasajerosLoading, setPasajerosLoading] = useState(false)
  const [pasajerosError, setPasajerosError] = useState(null)

  const [reservaData, setReservaData] = useState(null)
  const [reservaLoading, setReservaLoading] = useState(false)
  const [reservaError, setReservaError] = useState(null)

  const [updatingReservaLoading, setUpdatingReservaLoading] = useState(false)
  const [updatingReservaError, setUpdatingReservaError] = useState(null)

  const [updatingConductorLoading, setUpdatingConductorLoading] =
    useState(false)
  const [updatingConductorError, setUpdatingConductorError] = useState(null)

  // Método para registrar cliente
  const registerClient = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await registrarCliente(data)
      setUsuarioData(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Método para registrar chofer
  const registerChofer = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await registrarChofer(data)
      setUsuarioData(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Método para registrar auto
  const registerAuto = async (data) => {
    setAutoLoading(true)
    setAutoError(null)
    setAutoData(null)
    try {
      const response = await registrarAuto(data)
      setAutoData(response)
    } catch (err) {
      setAutoError(err.message)
    } finally {
      setAutoLoading(false)
    }
  }

  // Método para obtener pasajeros
  const getPasajeros = async (id) => {
    setPasajerosLoading(true)
    setPasajerosError(null)
    setPasajerosData(null)
    try {
      const response = await obtenerPasajeros({ id })
      setPasajerosData(response)
      return response
    } catch (err) {
      setPasajerosError(err.message)
      throw err
    } finally {
      setPasajerosLoading(false)
    }
  }

  // Método para obtener reserva
  const getReserva = async (id) => {
    setReservaLoading(true)
    setReservaError(null)
    setReservaData(null)
    try {
      const response = await obtenerReserva({ id })
      setReservaData(response)
      return response
    } catch (err) {
      setReservaError(err.message)
      throw err
    } finally {
      setReservaLoading(false)
    }
  }

  // Método para actualizar estado de una reserva
  const updateReservaStatus = async (id_reserva) => {
    setUpdatingReservaLoading(true)
    setUpdatingReservaError(null)
    try {
      const response = await actualizarEstadoReserva({ id_reserva })
      return response
    } catch (err) {
      setUpdatingReservaError(err.message)
      throw err
    } finally {
      setUpdatingReservaLoading(false)
    }
  }

  // Método para actualizar la disponibilidad del conductor
  const updateConductorAvailability = async (id_chofer) => {
    setUpdatingConductorLoading(true)
    setUpdatingConductorError(null)
    try {
      const response = await actualizarDisponibilidadConductor({ id_chofer })
      return response
    } catch (err) {
      setUpdatingConductorError(err.message)
      throw err
    } finally {
      setUpdatingConductorLoading(false)
    }
  }

  return {
    usuarioData,
    loading,
    error,
    autoData,
    autoLoading,
    autoError,
    pasajerosData,
    pasajerosLoading,
    pasajerosError,
    reservaData,
    reservaLoading,
    reservaError,
    updatingReservaLoading,
    updatingReservaError,
    updatingConductorLoading,
    updatingConductorError,
    registerClient,
    registerChofer,
    registerAuto,
    getPasajeros,
    getReserva,
    updateReservaStatus,
    updateConductorAvailability, // Método para actualizar la disponibilidad del conductor
  }
}
