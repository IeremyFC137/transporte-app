export async function registrarCliente(data) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await fetch(`${API_URL}Cliente/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    console.error('Error al enviar datos al endpoint Cliente:', error)
    throw error
  }
}