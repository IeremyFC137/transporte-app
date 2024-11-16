export async function obtenerReserva({ id }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    // Realizar el GET al endpoint con el ID
    const response = await fetch(`${API_URL}Reserva/${id}/`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true', // Evitar advertencias de ngrok
      },
    })

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${response.statusText || 'Unknown error'}`
      )
    }

    const responseData = await response.json()
    return responseData // Retorna los datos si la respuesta es 200
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    throw error
  }
}
