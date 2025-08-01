import React, { useState, useEffect } from 'react';
import shoes1 from '../src/img/shoes.png';
import shoes4 from '../src/img/shoes4.png';
import shoes5 from '../src/img/shoes5.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const images = [shoes1, shoes4, shoes5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/main/popularProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('error fetching products', error);
      }
    };
    fetchPopularProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main className="bg-dark p-5"  style={{height:'91vh'}}>
        <section className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-warning" style={{ fontSize: '60px', marginTop: '30px' }}>
                SHOES SUMMER
              </h1>
              <h3 className="text-white fs-1">COLLECTIONS 2025</h3>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit accusantium, ipsum,
                molestiae quisquam eum enim temporibus eius provident nostrum.
              </p>
              <div>
                <button className="btn btn-warning">
                  Shop Now <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="bg-secondary rounded-circle position-relative mx-auto"
                style={{
                  width: '80vw',
                  maxWidth: '400px',
                  height: '80vw',
                  maxHeight: '400px',
                  boxShadow: '-15px 30px 30px rgba(255, 255, 0, 0.6)',
                }}
              >
                <img
                  src={images[currentIndex]}
                  alt="Shoes"
                  style={{
                    position: 'absolute',
                    left: '-10%',
                    transform: 'rotate(-20deg)',
                    transition: 'all 0.5s ease-in-out',
                    width: '120%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
