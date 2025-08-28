import './App.css';
import logo from './assets/logo.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['#03010aff', '#2d70a7ff']
  );

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setFeedbackMessage('Submitting your message...');

    const serviceId = 'service_brqs5t1';
    const templateId = 'template_s431i5f';
    const publicKey = 'RVmFTavAZH_-o410c';

    emailjs.send(serviceId, templateId, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFeedbackMessage('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }, (error) => {
        console.error('FAILED...', error);
        setFeedbackMessage('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
                <a className="nav-link" href="#team">Our Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <motion.div style={{ backgroundColor }}>
        <section className="hero-section text-center py-5">
          <div className="container-fluid">
            <h1 className="display-4 fw-bold">Welcome to Zeutron Labs</h1>
            <p className="lead mt-3">An innovative place to kickstart your dream</p>
          </div>
        </section>
      </motion.div>

      <section id="about" className="about-section py-5">
        <div className="container-fluid text-center">
          <h2 className="mb-4">About Us</h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '800px' }}>
            Welcome to Zeutron Labs — where creativity meets technology. We're a passionate team of makers, engineers, and designers driven by one mission:
            to turn raw ideas into real-world hardware.
            Born out of a love for building, Zeutron Labs was founded to help students, startups, and creators bring their prototypes to life. Whether you're working on a college project, a startup demo, or your next big invention — we’re here to help you design, build, and launch it.
            We specialize in:
            Custom 3D printing for rapid prototyping
            PCB design and fabrication tailored to your specs
            Embedded and IoT solutions built on platforms like Arduino & ESP32
            At Zeutron Labs, we don’t just build projects — we build partnerships.
          </p>
        </div>
      </section>

      <section id="services" className="services-section py-5">
        <div className="container-fluid text-center">
          <h2 className="mb-4">Our Services</h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '1000px' }}>
            <ul>
              <p className="para">What We Offer</p>
              <p className="para">Explore our range of services built to support your creative and technical goals.</p>
              <p className="para">🔧 Custom 3D Printing<br />Precision-crafted prototypes and parts using high-quality filament and FDM technology. From mechanical components to functional art, we print it all.</p>
              <p className="para">🧩 PCB Design & Fabrication<br />Professional PCB layouts, Gerber generation, and prototype-friendly boards — whether it’s a mini-project or a production-ready circuit.</p>
              <p className="para">📡 IoT & Embedded Systems<br />Smart systems using ESP32, Arduino, NodeMCU and sensor integration. We help you build home automation, monitoring devices, and real-time projects.</p>
              <p className="para">🎓 Student Project Support<br />Helping students turn academic requirements into polished hardware projects. Fast, reliable, and made to impress your profs.</p>
              <p className="para">Want something not listed? Let us know — we take on custom challenges too.</p>
            </ul>
          </p>
        </div>
      </section>

      <section id="team" className=" team-section py-5 bg-dark text-white">
        <div className="container text-center">
          <h2 className="mb-4">Meet Our Team</h2>
          <div className="carousel-wrapper mx-auto" style={{ maxWidth: '350px' }}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
            >
              <div>
                <img src={logo} alt="Deepesh" />
                <h3 className="mt-3">Deepesh</h3>
                <p>Founder & Visionary Leader</p>
                <a href="https://www.instagram.com/__.zeutron.__?igsh=MWRwM205NzVzMmZmMA==" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <FaInstagram size={30} />
                </a>
                <a href="https://www.linkedin.com/company/your-linkedin-company-page" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <FaLinkedin size={30} />
                </a>
              </div>
              <div>
                <img src={logo} alt="Gokul" />
                <h3 className="mt-3">Gokul</h3>
                <p>Lead Developer & Innovator</p>
                <a href="https://www.instagram.com/___gokul08___?utm_source=qr&igsh=OGhuazQwaXJodDBx" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <FaInstagram size={30} />
                </a>
                <a href="https://www.linkedin.com/company/your-linkedin-company-page" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section py-5">
        <div className="container text-center">
          <h2 className="mb-4">Contact Us</h2>
          <p className="text-muted fs-5 mx-auto mb-5" style={{ maxWidth: '800px' }}>
            Have a question or a project in mind? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
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
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {feedbackMessage && <p className="mt-3">{feedbackMessage}</p>}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="mb-5">
          <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.linkedin.com/company/your-linkedin-company-page" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaLinkedin size={30} />
          </a>
        </div>
        <p className="mb-0">&copy; {new Date().getFullYear()} Zeutron Labs. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;