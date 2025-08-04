import React, { useState } from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const LinkShortener = () => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customSlug: '',
    expiryDays: ''
  });
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statsSlug, setStatsSlug] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl: formData.originalUrl,
          customSlug: formData.customSlug || undefined,
          expiryDays: formData.expiryDays ? parseInt(formData.expiryDays) : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setFormData({ originalUrl: '', customSlug: '', expiryDays: '' });
      } else {
        setError(data.message || 'Failed to shorten link');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getStats = async (slug) => {
    if (!slug) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/link/${slug}/stats`);
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        setError(data.message || 'Failed to get stats');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    getStats(statsSlug);
  };

  return (
    <div className="link-shortener-page">
           <AdBanner />
      <div className="page-header text-center mb-4">
        <h1>Link Shortener</h1>
        <p className="text-muted">
          Convert long URLs into short, manageable links with optional custom slugs and expiry dates.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="grid grid-2">
        {/* Create Short Link */}
        <div className="card">
          <h2 className="card-title">Shorten URL</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Original URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.originalUrl}
                onChange={(e) => setFormData({...formData, originalUrl: e.target.value})}
                placeholder="https://example.com/very-long-url"
                required
              />
              <small className="text-muted">
                Include http:// or https:// in your URL
              </small>
            </div>
<BannerAdBox />
            <div className="form-group">
              <label className="form-label">Custom Slug (optional)</label>
              <input
                type="text"
                className="form-input"
                value={formData.customSlug}
                onChange={(e) => setFormData({...formData, customSlug: e.target.value.replace(/[^a-zA-Z0-9_-]/g, '')})}
                placeholder="my-custom-link"
                maxLength={20}
                pattern="[a-zA-Z0-9_-]+"
              />
              <small className="text-muted">
                3-20 characters, letters, numbers, hyphens, and underscores only
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">Expiry (days, optional)</label>
              <select
                className="form-select"
                value={formData.expiryDays}
                onChange={(e) => setFormData({...formData, expiryDays: e.target.value})}
              >
                <option value="">Never expires</option>
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten Link'}
            </button>
          </form>
        </div>

        {/* Get Link Stats */}
        <div className="card">
          <h2 className="card-title">Link Statistics</h2>
          <form onSubmit={handleStatsSubmit}>
            <div className="form-group">
              <label className="form-label">Short Link Slug</label>
              <input
                type="text"
                className="form-input"
                value={statsSlug}
                onChange={(e) => setStatsSlug(e.target.value)}
                placeholder="abc123"
                required
              />
              <small className="text-muted">
                Enter the slug part of your short link (after /l/)
              </small>
            </div>

            <button type="submit" className="btn btn-secondary" disabled={loading}>
              {loading ? 'Loading...' : 'Get Statistics'}
            </button>
          </form>

          {stats && (
            <div className="stats-result mt-3">
              <h3 className="card-subtitle">Link Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <strong>Original URL:</strong>
                  <span className="stat-value">{stats.originalUrl}</span>
                </div>
                <div className="stat-item">
                  <strong>Short Slug:</strong>
                  <span className="stat-value">{stats.slug}</span>
                </div>
                <div className="stat-item">
                  <strong>Total Clicks:</strong>
                  <span className="stat-value">{stats.hitCount}</span>
                </div>
                <div className="stat-item">
                  <strong>Created:</strong>
                  <span className="stat-value">{new Date(stats.createdAt).toLocaleString()}</span>
                </div>
                {stats.expiresAt && (
                  <div className="stat-item">
                    <strong>Expires:</strong>
                    <span className={`stat-value ${stats.isExpired ? 'text-danger' : ''}`}>
                      {new Date(stats.expiresAt).toLocaleString()}
                      {stats.isExpired && ' (Expired)'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="result-section mt-4">
          <div className="card">
            <h3 className="card-title text-success">✅ Link Shortened Successfully!</h3>
            
            <div className="result-grid">
              <div className="result-item">
                <label className="form-label">Original URL:</label>
                <div className="url-display">
                  <span className="url-text">{result.originalUrl}</span>
                </div>
              </div>
              
              <div className="result-item">
                <label className="form-label">Short URL:</label>
                <div className="url-display">
                  <span className="url-text">{result.shortUrl}</span>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => copyToClipboard(result.shortUrl)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="result-item">
                <label className="form-label">Slug:</label>
                <div className="code-display">
                  {result.slug}
                </div>
              </div>
              
              {result.expiresAt && (
                <div className="result-item">
                  <label className="form-label">Expires:</label>
                  <div className="expiry-display">
                    {new Date(result.expiresAt).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <div className="result-actions mt-3">
              <button 
                className="btn btn-primary"
                onClick={() => copyToClipboard(result.shortUrl)}
              >
                📋 Copy Short Link
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setStatsSlug(result.slug);
                  getStats(result.slug);
                }}
              >
                📊 View Statistics
              </button>
              <a 
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                🚀 Test Link
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="info-section mt-4">
        <div className="card">
          <h3 className="card-title">How Link Shortening Works</h3>
          <div className="grid grid-3">
            <div className="info-step">
              <div className="step-number">1</div>
              <h4>Enter URL</h4>
              <p>Paste your long URL and optionally customize the short link slug.</p>
            </div>
            <div className="info-step">
              <div className="step-number">2</div>
              <h4>Get Short Link</h4>
              <p>Receive a shortened URL that redirects to your original link.</p>
            </div>
            <div className="info-step">
              <div className="step-number">3</div>
              <h4>Track Clicks</h4>
              <p>Monitor how many times your short link has been clicked.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Features</h3>
          <ul className="features-list">
            <li>✅ Custom short slugs for branded links</li>
            <li>✅ Click tracking and analytics</li>
            <li>✅ Optional expiry dates</li>
            <li>✅ Instant redirect without delay</li>
            <li>✅ No registration required</li>
            <li>✅ Free to use</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background-color: var(--bg-tertiary);
          border-radius: 6px;
        }

        .stat-value {
          font-weight: 500;
          word-break: break-all;
        }

        .result-grid {
          display: grid;
          gap: 1rem;
        }

        .result-item {
          padding: 1rem;
          background-color: var(--bg-tertiary);
          border-radius: 8px;
        }

        .url-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .url-text {
          flex: 1;
          padding: 0.5rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: monospace;
          word-break: break-all;
        }

        .code-display {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: monospace;
          text-align: center;
          font-weight: bold;
        }

        .expiry-display {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          text-align: center;
        }

        .result-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-small {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .info-step {
          text-align: center;
          padding: 1rem;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--accent-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .info-step h4 {
          margin: 0.5rem 0;
          color: var(--text-primary);
        }

        .features-list {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 0.5rem;
        }

        .features-list li {
          padding: 0.5rem;
          background-color: var(--bg-tertiary);
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .result-actions {
            flex-direction: column;
          }

          .url-display {
            flex-direction: column;
          }

          .info-step {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LinkShortener;
