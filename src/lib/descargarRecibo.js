export async function descargarRecibo(data) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await fetch(`${API_URL}DocPago/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_reserva: data.id_reserva,
        id_cliente: data.id_cliente,
        costo_servicio: data.costo_servicio,
        costo_total: data.costo_total,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text() // Leer error como texto
      throw new Error(
        `Error: ${response.status} - ${errorText || 'Unknown error'}`
      )
    }

    // Procesar la respuesta como un blob (PDF)
    const blob = await response.blob()

    // Crear un enlace de descarga dinámico
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `recibo_${data.id_reserva}.pdf` // Nombre sugerido para el archivo
    document.body.appendChild(link)
    link.click() // Simular clic para iniciar la descarga

    // Limpiar el enlace y liberar memoria
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true // Indica éxito
  } catch (error) {
    console.error('Error al descargar el recibo:', error)
    throw error
  }
}
