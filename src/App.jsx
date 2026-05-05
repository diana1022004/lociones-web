import { useEffect, useState } from 'react'
import { client, urlFor } from './sanity'

function App() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    client
      .fetch(`*[_type == "producto"]{
        nombre,
        precio,
        descripcion,
        imagen
      }`)
      .then((data) => setProductos(data))
  }, [])

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    title: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '20px'
    },
    input: {
      display: 'block',
      margin: '0 auto 30px auto',
      padding: '10px',
      width: '250px',
      borderRadius: '8px',
      border: '1px solid #ccc'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '15px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    image: {
      width: '100%',
      borderRadius: '10px'
    },
    button: {
      background: '#25D366',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '10px'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lociones</h1>

      <input
        type="text"
        placeholder="Buscar loción..."
        style={styles.input}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div style={styles.grid}>
        {productosFiltrados.map((p, i) => (
          <div key={i} style={styles.card}>

            {p.imagen && (
              <img
                src={urlFor(p.imagen).width(300)}
                alt={p.nombre}
                style={styles.image}
              />
            )}

            <h2>{p.nombre}</h2>
            <p><strong>${p.precio}</strong></p>
            <p>{p.descripcion}</p>

            <a
              href={`https://wa.me/573234587897?text=Hola quiero comprar ${p.nombre} por $${p.precio}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.button}
            >
              Comprar por WhatsApp
            </a>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App