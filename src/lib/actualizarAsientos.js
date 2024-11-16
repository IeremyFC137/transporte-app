export async function actualizarAsientos({ id_chofer, cant_pasajeros }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await fetch(`${API_URL}Auto/${id_chofer}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo_vehiculo: cant_pasajeros,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        `Error: ${response.status} - ${errorData.detail || 'Unknown error'}`
      )
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al actualizar tipo_vehiculo:', error)
    throw error
  }
}
