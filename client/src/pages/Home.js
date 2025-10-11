import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const Home = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'MongoDB', level: 75 }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '📋',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      link: '#',
      github: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with location-based forecasts, charts, and historical data visualization.',
      image: '🌤️',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
      link: '#',
      github: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive portfolio website built with modern React practices, featuring smooth animations and mobile-first design.',
      image: '💼',
      technologies: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
      link: '#',
      github: '#'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Alex Johnson</span>
            </h1>
            <h2 className="hero-subtitle">
              Full-Stack Developer & UI/UX Designer
            </h2>
            <p className="hero-description">
              I create beautiful, functional, and user-centered digital experiences. 
              Passionate about clean code, innovative solutions, and bringing ideas to life.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-image">
                <div className="avatar">👨‍💻</div>
              </div>
              <div className="profile-info">
                <h3>Alex Johnson</h3>
                <p>Full-Stack Developer</p>
                <div className="social-links">
                  <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Passionate developer with a love for creating exceptional digital experiences
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that make a difference. I specialize in React, Node.js, and 
                modern web technologies, with a strong focus on user experience and performance.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying up-to-date with the latest industry trends.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">👨‍💻</span>
                  <p>Professional Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">
              Technologies I work with to bring ideas to life
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A showcase of my recent work and side projects
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <div className="project-icon">{project.image}</div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.link} className="btn btn-primary btn-sm">
                      Live Demo
                    </a>
                    <a href={project.github} className="btn btn-secondary btn-sm">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Let's work together to bring your ideas to life
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>alex.johnson@email.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Location</h3>
                  <p>San Francisco, CA</p>
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://dribbble.com" className="social-link" target="_blank" rel="noopener noreferrer">Dribbble</a>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    className="form-textarea" 
                    placeholder="Your Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          background: var(--bg-gradient);
          color: white;
          padding: 6rem 2rem;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .highlight {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.8;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: var(--radius-xl);
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .avatar {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .profile-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .profile-info p {
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: var(--bg-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .about-section {
          padding: 6rem 2rem;
          background: var(--bg-secondary);
        }

        .about-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-text p {
          font-size: 1.125rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .image-placeholder {
          background: var(--bg-primary);
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-xl);
          padding: 3rem;
          text-align: center;
        }

        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .skills-section {
          padding: 6rem 2rem;
        }

        .skills-grid {
          display: grid;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .skill-item {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .skill-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .skill-percentage {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .skill-bar {
          height: 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: var(--bg-gradient);
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }

        .projects-section {
          padding: 6rem 2rem;
          background: var(--bg-secondary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .project-image {
          padding: 2rem;
          text-align: center;
          background: var(--bg-gradient);
        }

        .project-icon {
          font-size: 3rem;
        }

        .project-content {
          padding: 2rem;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .project-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .btn-sm {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
        }

        .contact-section {
          padding: 6rem 2rem;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .contact-icon {
          font-size: 1.5rem;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient);
          border-radius: var(--radius-lg);
        }

        .contact-details h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .contact-details p {
          color: var(--text-secondary);
        }

        .contact-form {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .project-links {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
