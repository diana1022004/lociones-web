import { useEffect, useState } from 'react'
import { client, urlFor } from './sanity'

function App() {
  const [productos, setProductos] = useState([])

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

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Lociones</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {productos.map((p, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '10px',
            textAlign: 'center'
          }}>
            {p.imagen && (
              <img
                src={urlFor(p.imagen).width(200)}
                alt={p.nombre}
                style={{ width: '100%', borderRadius: '10px' }}
              />
            )}

            <h2>{p.nombre}</h2>
            <p><strong>${p.precio}</strong></p>
            <p>{p.descripcion}</p>

            <a
              href={`https://wa.me/573234587897?text=Hola%20quiero%20la%20loción%20${p.nombre}`}
              target="_blank"
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '10px',
                background: 'green',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none'
              }}
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