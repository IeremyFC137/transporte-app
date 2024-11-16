'use client'

import { useState } from 'react'
import { enviarReserva } from '../lib/enviarReserva'
import { enviarEquipaje } from '../lib/enviarEquipaje'
import { reservarAuto } from '../lib/reservarAuto'
import { actualizarAsientos } from '../lib/actualizarAsientos'
import { descargarRecibo } from '../lib/descargarRecibo' // Importa la función de descarga

export function useReserva() {
  // Estados para `postReserva`
  const [reservaLoading, setReservaLoading] = useState(false)
  const [reservaError, setReservaError] = useState(null)
  const [reservaResponse, setReservaResponse] = useState(null)

  // Estados para `postEquipaje`
  const [equipajeLoading, setEquipajeLoading] = useState(false)
  const [equipajeError, setEquipajeError] = useState(null)
  const [equipajeResponse, setEquipajeResponse] = useState(null)

  // Estados para `postReservarAuto`
  const [autoLoading, setAutoLoading] = useState(false)
  const [autoError, setAutoError] = useState(null)
  const [autoResponse, setAutoResponse] = useState(null)

  // Estados para `postActualizarAsiento`
  const [asientoLoading, setAsientoLoading] = useState(false)
  const [asientoError, setAsientoError] = useState(null)
  const [asientoResponse, setAsientoResponse] = useState(null)

  // Estados para `postDescargarRecibo`
  const [reciboLoading, setReciboLoading] = useState(false)
  const [reciboError, setReciboError] = useState(null)
  const [reciboResponse, setReciboResponse] = useState(null)

  // Método para enviar la reserva
  const postReserva = async (data) => {
    setReservaLoading(true)
    setReservaError(null)
    setReservaResponse(null)

    try {
      const result = await enviarReserva(data)
      setReservaResponse(result)
      return result
    } catch (err) {
      console.error('Error al enviar la reserva:', err)
      setReservaError(err.message)
      throw err
    } finally {
      setReservaLoading(false)
    }
  }

  // Método para enviar los datos de equipaje
  const postEquipaje = async (data) => {
    setEquipajeLoading(true)
    setEquipajeError(null)
    setEquipajeResponse(null)

    try {
      const result = await enviarEquipaje(data)
      setEquipajeResponse(result)
      return result
    } catch (err) {
      console.error('Error al enviar el equipaje:', err)
      setEquipajeError(err.message)
      throw err
    } finally {
      setEquipajeLoading(false)
    }
  }

  // Método para reservar el auto
  const postReservarAuto = async (data) => {
    setAutoLoading(true)
    setAutoError(null)
    setAutoResponse(null)

    try {
      const result = await reservarAuto(data)
      setAutoResponse(result)
      return result
    } catch (err) {
      console.error('Error al reservar el auto:', err)
      setAutoError(err.message)
      throw err
    } finally {
      setAutoLoading(false)
    }
  }

  // Método para actualizar el asiento
  const postActualizarAsientos = async (data) => {
    setAsientoLoading(true)
    setAsientoError(null)
    setAsientoResponse(null)

    try {
      const result = await actualizarAsientos(data)
      setAsientoResponse(result)
      return result
    } catch (err) {
      console.error('Error al actualizar el asiento:', err)
      setAsientoError(err.message)
      throw err
    } finally {
      setAsientoLoading(false)
    }
  }

  // Método para descargar el recibo
  const postDescargarRecibo = async (data) => {
    setReciboLoading(true)
    setReciboError(null)
    setReciboResponse(null)

    try {
      const result = await descargarRecibo(data) // Llamada a la función descargarRecibo
      setReciboResponse(result)
      return result
    } catch (err) {
      console.error('Error al descargar el recibo:', err)
      setReciboError(err.message)
      throw err
    } finally {
      setReciboLoading(false)
    }
  }

  return {
    postReserva, // Método para enviar la reserva
    postEquipaje, // Método para enviar el equipaje
    postReservarAuto, // Método para reservar el auto
    postActualizarAsientos, // Método para actualizar el asiento
    postDescargarRecibo, // Método para descargar el recibo
    // Estados de `postReserva`
    reservaLoading,
    reservaError,
    reservaResponse,
    // Estados de `postEquipaje`
    equipajeLoading,
    equipajeError,
    equipajeResponse,
    // Estados de `postReservarAuto`
    autoLoading,
    autoError,
    autoResponse,
    // Estados de `postActualizarAsiento`
    asientoLoading,
    asientoError,
    asientoResponse,
    // Estados de `postDescargarRecibo`
    reciboLoading,
    reciboError,
    reciboResponse,
  }
}
