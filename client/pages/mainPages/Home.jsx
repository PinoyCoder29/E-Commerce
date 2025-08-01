import React, { useState, useEffect } from 'react';
import shoes1 from '../../src/img/shoes.png';
import shoes4 from '../../src/img/shoes4.png';
import shoes5 from '../../src/img/shoes5.png';
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
      <main className="bg-dark p-5">
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

      {/* Popular Products Section */}
      <section className="p-4 bg-dark">
        <div className="container">
          <h3 className="text-light mb-4">
            POPULAR <span className="text-warning">PRODUCTS</span>
          </h3>

          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.product_id}>
                <div
                  className="card product-card"
                  style={{
                    backgroundColor: '#010108ff',
                    borderRadius: '20px',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <div className="card-header bg-transparent border-0">
                    <div className=" bg-dark p-2 rounded-4 background">
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <h3 className="text-warning">{product.product_name}</h3>
                    <h6 className="text-light">₱{product.price}</h6>
                  </div>

                  <div className="card-footer d-flex justify-content-center gap-3 border-0 bg-transparent">
                    <Link className="btn btn-warning">Buy Now</Link>
                    <Link className="btn btn-dark">Add To Cart</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CSS for hover effect */}
      <style>{`
        .product-card:hover {
          transform: rotate(-1deg) scale(1.02) translateY(-5px);
          box-shadow: 0 15px 30px rgba(255, 255, 0, 0.3);
        }   
       .background:hover{
       background-color: gold;
       }   
      `
      }</style>
    </div>
  );
};

export default Home;
