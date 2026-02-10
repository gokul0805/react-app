import './App.css';
import logo from './assets/logo.jpg';
import pcb from './assets/pcb.jpg';
import esp from './assets/esp.jpg';
import ScrollFadeIn from './ScrollFadeIn';
import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import useCarousel from './useCarousel';
import Cursor from './components/Cursor'; // Import Cursor

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');



  // Carousel hook for service cards
  const {
    currentIndex,
    isPlaying,
    goToNext,
    goToPrevious,
    goToSlide,
    togglePlayPause,
    pauseCarousel,
    resumeCarousel,
    getCardPosition,
  } = useCarousel(4, 4000); // 4 cards, 4 second intervals


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('Submitting your message...');

    const serviceId = 'service_brqs5t1';
    const templateId = 'template_s431i5f';
    const publicKey = 'RVmFTavAZH_-o410c';

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFeedbackMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setFeedbackMessage('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Cursor /> {/* Render Custom Cursor */}

      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid text-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="rounded-circle me-2"
            />
            <span>Zeutron Labs</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Our Services</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <section className="hero-section text-center py-5">
        <div className="container-fluid">
          <ScrollFadeIn>
            <h1 className="display-4 fw-bold">Welcome to Zeutron Labs</h1> </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p className="lead mt-3">An innovative place to kickstart your dream</p></ScrollFadeIn>
        </div>
      </section>


      <section id="about" className="about-section py-5">
        <div className="container-fluid text-center">
          <ScrollFadeIn>
            <h2 className="mb-4">About Us</h2>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.4}>

            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: '800px' }}
            >
              Welcome to Zeutron Labs — where creativity meets technology. We're a passionate
              team of makers, engineers, and designers driven by one mission: to turn raw ideas
              into real-world hardware.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: '800px' }}
            >
              Born out of a love for building, Zeutron Labs was founded to help students,
              startups, and creators bring their prototypes to life.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: '800px' }}
            >
              Whether you're working on a college project, a startup demo, or your next big
              invention — we’re here to help you design, build, and launch it.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: '800px' }}
            >
              We specialize in:
              Custom 3D printing for rapid prototyping
              PCB design and fabrication tailored to your specs
              Embedded and IoT solutions built on platforms like Arduino & ESP32
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.4}>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: '800px' }}
            >
              At Zeutron Labs, we don’t just build projects — we build partnerships.
            </p>
          </ScrollFadeIn>

        </div>
      </section>


      <section id="services" className="services-section py-5">
        <div className="container-fluid text-center">
          <ScrollFadeIn>
            <h2 className="mb-4">Our Services</h2>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.2}>
            <p className="text-muted fs-5 mx-auto mb-5" style={{ maxWidth: '800px' }}>
              Explore our range of services built to support your creative and technical goals.
            </p>
          </ScrollFadeIn>



          {/* Service Cards Carousel */}
          <div
            className="services-carousel-container"

          >
            {/* Custom 3D Printing Service */}
            <div
              className={`service-card-carousel ${getCardPosition(0).isActive ? 'active' : ''}`}
              style={{
                transform: `translate3d(${getCardPosition(0).x}px, ${getCardPosition(0).y}px, ${getCardPosition(0).z}px) scale(${getCardPosition(0).scale}) rotateY(${getCardPosition(0).rotateY}deg)`,
                opacity: getCardPosition(0).opacity,
                zIndex: getCardPosition(0).isActive ? 10 : 1
              }}
            >
              <div className="service-card h-100 p-4 border rounded shadow-sm bg-light">
                <div className="service-image mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop&crop=center"
                    alt="3D Printing"
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h5 className="mb-1">Custom 3D Printing</h5>
                <p className="text-muted">
                  Precision-crafted prototypes and parts using high-quality filament and FDM technology.
                </p>
              </div>
            </div>

            {/* PCB Design & Fabrication Service */}
            <div
              className={`service-card-carousel ${getCardPosition(1).isActive ? 'active' : ''}`}
              style={{
                transform: `translate3d(${getCardPosition(1).x}px, ${getCardPosition(1).y}px, ${getCardPosition(1).z}px) scale(${getCardPosition(1).scale}) rotateY(${getCardPosition(1).rotateY}deg)`,
                opacity: getCardPosition(1).opacity,
                zIndex: getCardPosition(1).isActive ? 10 : 1
              }}
            >
              <div className="service-card h-100 p-4 border rounded shadow-sm bg-light">
                <div className="service-image mb-2">
                  <img
                    src={pcb}
                    alt="PCB Design"
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h5 className="mb-1">PCB Design & Fabrication</h5>
                <p className="text-muted">
                  Professional PCB layouts, Gerber generation, and prototype-friendly boards.
                </p>
              </div>
            </div>

            {/* IoT & Embedded Systems Service */}
            <div
              className={`service-card-carousel ${getCardPosition(2).isActive ? 'active' : ''}`}
              style={{
                transform: `translate3d(${getCardPosition(2).x}px, ${getCardPosition(2).y}px, ${getCardPosition(2).z}px) scale(${getCardPosition(2).scale}) rotateY(${getCardPosition(2).rotateY}deg)`,
                opacity: getCardPosition(2).opacity,
                zIndex: getCardPosition(2).isActive ? 10 : 1
              }}
            >
              <div className="service-card h-100 p-4 border rounded shadow-sm bg-light">
                <div className="service-image mb-2">
                  <img
                    src={esp}
                    alt="IoT Systems"
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h5 className="mb-1">IoT & Embedded Systems</h5>
                <p className="text-muted">
                  Smart systems using ESP32, Arduino, NodeMCU and sensor integration.
                </p>
              </div>
            </div>

            {/* Student Project Support Service */}
            <div
              className={`service-card-carousel ${getCardPosition(3).isActive ? 'active' : ''}`}
              style={{
                transform: `translate3d(${getCardPosition(3).x}px, ${getCardPosition(3).y}px, ${getCardPosition(3).z}px) scale(${getCardPosition(3).scale}) rotateY(${getCardPosition(3).rotateY}deg)`,
                opacity: getCardPosition(3).opacity,
                zIndex: getCardPosition(3).isActive ? 10 : 1
              }}
            >
              <div className="service-card h-100 p-4 border rounded shadow-sm bg-light">
                <div className="service-image mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=150&fit=crop&crop=center"
                    alt="Student Projects"
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h5 className="mb-1">Student Project Support</h5>
                <p className="text-muted">
                  Helping students turn academic requirements into polished hardware projects.
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls mt-4 mb-4">
            <button
              className="btn btn-outline-light me-3"
              onClick={goToPrevious}
              aria-label="Previous service"
            >
              ←
            </button>

            <button
              className="btn btn-outline-light"
              onClick={goToNext}
              aria-label="Next service"
            >
              →
            </button>
          </div>
        </div>
      </section>





      <section id="contact" className="contact-section py-5">
        <div className="container text-center">
          <ScrollFadeIn>
            <h2 className="mb-4">Contact Us</h2>
          </ScrollFadeIn>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <ScrollFadeIn delay={0.4}>
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border rounded shadow-sm bg-light"
                >
                  <ScrollFadeIn delay={0.4}>
                    <div className="mb-3">

                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </ScrollFadeIn>
                  <ScrollFadeIn delay={0.4}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </ScrollFadeIn>
                  <ScrollFadeIn delay={0.4}>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </ScrollFadeIn>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </ScrollFadeIn>
              {feedbackMessage && <p className="mt-3">{feedbackMessage}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="mb-5">
          <a
            href="https://www.instagram.com/your-instagram-page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.linkedin.com/company/your-linkedin-company-page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Zeutron Labs. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
