function validateLoginData({ id }) {
  if (!id) {
    throw new Error('El campo "id" es requerido.')
  }
}

export async function iniciarSesion({ id, tipo_usuario }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    // Validar que el ID esté presente
    validateLoginData({ id })

    // Realizar el GET al endpoint con el ID
    const response = await fetch(`${API_URL}${tipo_usuario}/${id}/`, {
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
