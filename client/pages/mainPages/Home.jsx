import React, { useState, useEffect } from 'react'
import shoes1 from '../../src/img/shoes.png'
import shoes2 from '../../src/img/shoes2.png'
import shoes3 from '../../src/img/shoes3.png'
import shoes4 from '../../src/img/shoes4.png'
import shoes5 from '../../src/img/shoes5.png'

const Home = () => {
  const images = [shoes1,shoes4,shoes5] // ✅ renamed to 'images'
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() =>{
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000);
    return () => clearInterval(interval)
  },[])

  return (
    <div>
      <main className="bg-dark p-5">
        <section className="container">
          <div className="row">

            <div className="col-md-6">
              <h1 className='text-warning' style={{ fontSize: '60px', marginTop: '30px' }}>
                SHOES SUMMER
              </h1>
              <h3 className='text-white fs-1'>COLLECTIONS 2025</h3>
              <p className='text-white'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit accusantium, ipsum, molestiae quisquam eum enim temporibus
                eius provident nostrum.
              </p>

              <div>
                <button className='btn btn-warning'>
                  Show Now <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="bg-secondary rounded-circle position-relative"
                style={{
                  width: '400px',
                  height: '400px',
                  position: 'relative',
                  boxShadow: '-15px 30px 30px rgba(255, 255, 0, 0.6)'
                }}
              >
                <img
                  src={images[currentIndex]} // ✅ fixed here
                  alt="Shoes"
                  style={{
                    position: 'absolute',
                    left: '-70px',
                    transform: 'rotate(-20deg)',
                    transition: 'all 0.5s ease-in-out',
                    width: '530px',
                     objectFit: 'contain',
                  }}
                />
              </div>
            </div>

          </div>
        </section>
      </main>

  <section className='p-4 bg-dark'>
    <div className='container'>
      <h3 className='text-light'>POPULAR <span className='text-warning'>PRODUCTS</span></h3>
    </div>
  </section>

    </div>
  )
}

export default Home
