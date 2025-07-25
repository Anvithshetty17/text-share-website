import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'Text Sharing',
      description: 'Share text securely with a 4-digit code. Auto-deletes after 10 minutes.',
      icon: '📝',
      link: '/text-share',
      color: 'accent-primary'
    },
    {
      title: 'Resume Builder',
      description: 'Create professional resumes with multiple templates and download as PDF.',
      icon: '📄',
      link: '/resume-builder',
      color: 'accent-secondary'
    },
    {
      title: 'Link Shortener',
      description: 'Convert long URLs into short, manageable links with analytics.',
      icon: '🔗',
      link: '/link-shortener',
      color: 'accent-warning'
    },
    {
      title: 'Student Tools',
      description: 'Access helpful tools like GPA calculator, Pomodoro timer, and more.',
      icon: '🎓',
      link: '/student-tools',
      color: 'accent-danger'
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section text-center mb-4">
        <h1 className="hero-title">
          Welcome to GoText
        </h1>
        <p className="hero-subtitle text-muted">
          Your all-in-one platform for text sharing and productivity tools
        </p>
        <p className="hero-description">
          🚫 No signup required • 🎨 Custom themes • 🔒 Privacy-focused
        </p>
      </div>

      <div className="features-grid grid grid-2">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="feature-card">
            <div className="card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
              <button className="btn btn-primary mt-2">
                Get Started →
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="info-section mt-4">
        <div className="grid grid-3">
          <div className="card text-center">
            <h3 className="card-title">🔒 Privacy First</h3>
            <p className="text-muted">
              No accounts required. Your data is automatically deleted after use for maximum privacy and security.
            </p>
          </div>
          <div className="card text-center">
            <h3 className="card-title">⚡ Fast & Simple</h3>
            <p className="text-muted">
              Clean, intuitive interface designed for students and professionals who value efficiency and ease of use.
            </p>
          </div>
          <div className="card text-center">
            <h3 className="card-title">📱 Responsive</h3>
            <p className="text-muted">
              Works perfectly on all devices - desktop, tablet, and mobile with optimized user experience.
            </p>
          </div>
        </div>
      </div>

      <div className="content-section mt-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">Why Choose GoText?</h2>
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-3">Comprehensive Digital Tools</h3>
              <p className="text-muted mb-4">
                GoText provides a complete suite of digital tools designed to enhance your productivity and streamline 
                your online activities. Whether you're a student working on assignments, a professional managing 
                projects, or someone who frequently shares information online, our platform offers the essential 
                tools you need in one convenient location.
              </p>
              <p className="text-muted mb-4">
                Our text sharing feature allows you to quickly share documents, notes, code snippets, and other 
                text-based content through secure, temporary links. The link shortener helps you create clean, 
                manageable URLs perfect for social media, email campaigns, and professional communications. The 
                resume builder provides professional templates and customization options to help you create 
                standout resumes that get noticed by employers.
              </p>
            </div>
            <div className="col-md-6">
              <h3 className="mb-3">Built for Modern Users</h3>
              <p className="text-muted mb-4">
                In today's fast-paced digital world, efficiency and reliability are paramount. GoText is built 
                with modern web technologies to ensure fast loading times, seamless user experience, and 
                compatibility across all devices and browsers. Our responsive design automatically adapts to 
                your screen size, providing an optimal experience whether you're using a smartphone, tablet, 
                or desktop computer.
              </p>
              <p className="text-muted mb-4">
                We understand that different users have different preferences, which is why we've included 
                features like dark mode, customizable themes, and intuitive navigation. Our platform is 
                designed to be accessible to users of all technical skill levels, from beginners to advanced 
                users who need powerful features and customization options.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-section mt-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">What Our Users Say</h2>
          <div className="grid grid-3">
            <div className="card">
              <p className="testimonial-text">
                "GoText has become an essential part of my daily workflow. The text sharing feature is perfect 
                for collaborating with team members, and the resume builder helped me land my dream job!"
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span className="text-muted">Marketing Professional</span>
              </div>
            </div>
            <div className="card">
              <p className="testimonial-text">
                "As a student, I love how easy it is to share notes and assignments with classmates. The 
                student tools section has everything I need for academic success, all in one place."
              </p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span className="text-muted">Computer Science Student</span>
              </div>
            </div>
            <div className="card">
              <p className="testimonial-text">
                "The link shortener is fantastic for our social media campaigns. The analytics help us track 
                engagement, and the clean URLs look much more professional than long, messy links."
              </p>
              <div className="testimonial-author">
                <strong>Emily Rodriguez</strong>
                <span className="text-muted">Digital Marketing Manager</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section mt-5">
        <div className="card text-center">
          <h2 className="mb-3">Ready to Get Started?</h2>
          <p className="text-muted mb-4">
            Join thousands of users who trust GoText for their digital productivity needs. 
            All our tools are free to use and require no registration.
          </p>
          <div className="cta-buttons">
            <Link to="/text-share" className="btn btn-primary me-3">Start Sharing Text</Link>
            <Link to="/resume-builder" className="btn btn-secondary">Build Your Resume</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .hero-description {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .feature-card {
          text-decoration: none;
          color: inherit;
        }

        .feature-card:hover .card {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .content-section {
          background: var(--bg-secondary);
          padding: 4rem 2rem;
          border-radius: var(--radius-lg);
          margin: 2rem 0;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .col-md-6 h3 {
          color: var(--accent-primary);
          font-size: 1.5rem;
          font-weight: 600;
        }

        .testimonials-section {
          padding: 2rem 0;
        }

        .testimonial-text {
          font-style: italic;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .testimonial-author strong {
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 3rem 2rem;
          border-radius: var(--radius-lg);
        }

        .cta-section h2 {
          color: white;
          font-size: 2rem;
        }

        .cta-section .text-muted {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }

          .row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .content-section {
            padding: 2rem 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
