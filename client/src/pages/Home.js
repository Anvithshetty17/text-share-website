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
              No accounts required. Your data is automatically deleted after use.
            </p>
          </div>
          <div className="card text-center">
            <h3 className="card-title">⚡ Fast & Simple</h3>
            <p className="text-muted">
              Clean, intuitive interface designed for students and professionals.
            </p>
          </div>
          <div className="card text-center">
            <h3 className="card-title">📱 Responsive</h3>
            <p className="text-muted">
              Works perfectly on all devices - desktop, tablet, and mobile.
            </p>
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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
