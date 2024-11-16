// Valida y procesa los datos del backend
function validateAndFormatVehiculos(data) {
  if (!Array.isArray(data)) {
    throw new Error('La respuesta del servidor no es un arreglo válido.')
  }

  return data.map((vehiculo) => {
    const {
      id_auto,
      id_chofer,
      modelo,
      patente,
      marca,
      capacidad,
      capacidad_maletas,
      costo_completo,
      costo_asiento,
      tipo_vehiculo,
    } = vehiculo

    // Validación básica de campos obligatorios
    if (!id_auto || !id_chofer || !modelo || !patente || !marca) {
      throw new Error('Faltan datos obligatorios en uno de los vehículos.')
    }

    return {
      id: id_auto,
      choferId: id_chofer,
      modelo,
      patente,
      marca,
      capacidad,
      capacidadMaletas: capacidad_maletas,
      costoCompleto: costo_completo,
      costoAsiento: costo_asiento,
      tipoVehiculo: tipo_vehiculo,
    }
  })
}

// Función para obtener los vehículos
export async function obtenerVehiculos() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await fetch(`${API_URL}Auto/`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true', // Evitar advertencias de ngrok
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(
        `Error al obtener vehículos: ${response.status} - ${response.statusText}`
      )
    }

    const data = await response.json()

    // Validar y formatear los datos recibidos
    return validateAndFormatVehiculos(data)
  } catch (error) {
    console.error('Error al obtener vehículos:', error.message)
    throw error // Relanza el error para manejo en el componente
  }
}
