import React, { useState, useEffect, useCallback } from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState(null);
  const [texts, setTexts] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stats');

  const authenticate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/admin/stats?password=${encodeURIComponent(password)}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTexts = useCallback(async () => {
    if (!isAuthenticated || !password) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/texts?password=${encodeURIComponent(password)}`);
      if (response.ok) {
        const data = await response.json();
        setTexts(data);
      }
    } catch (err) {
      setError('Failed to fetch texts');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, password]);

  const fetchLinks = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/links?password=${encodeURIComponent(password)}`);
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (err) {
      setError('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, password]);

  const deleteText = async (id) => {
    if (!window.confirm('Are you sure you want to delete this text?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/admin/texts/${id}?password=${encodeURIComponent(password)}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setTexts(prev => prev.filter(text => text._id !== id));
      } else {
        setError('Failed to delete text');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const deleteLink = async (id) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/admin/links/${id}?password=${encodeURIComponent(password)}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setLinks(prev => prev.filter(link => link._id !== id));
      } else {
        setError('Failed to delete link');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const cleanup = async () => {
    if (!window.confirm('This will delete all expired entries. Continue?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/cleanup?password=${encodeURIComponent(password)}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Cleanup completed. Deleted ${data.deletedLinks} expired links.`);
        if (activeTab === 'links') fetchLinks();
      } else {
        setError('Failed to cleanup');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'texts') fetchTexts();
      if (activeTab === 'links') fetchLinks();
    }
  }, [activeTab, isAuthenticated, fetchTexts, fetchLinks]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">

      <BannerAdBox />
        <div className="login-container">
          <div className="card">
            <h1 className="card-title text-center">Admin Panel</h1>
            <p className="text-center text-muted">
              Enter admin password to access the panel
            </p>
            
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            
            <form onSubmit={authenticate}>
              <div className="form-group">
                <label className="form-label">Admin Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </form>
            
            <div className="login-info mt-3">
              <small className="text-muted">
                Default password: admin123 (change in production)
              </small>
            </div>
          </div>
        </div>

        <style jsx>{`
          .admin-login {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .login-container {
            width: 100%;
            max-width: 400px;
            padding: 2rem;
          }

          .w-100 {
            width: 100%;
          }

          .login-info {
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
           <AdBanner />
        <h1>Admin Panel</h1>
        <button 
          className="btn btn-secondary"
          onClick={() => {
            setIsAuthenticated(false);
            setPassword('');
            setStats(null);
            setTexts([]);
            setLinks([]);
          }}
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button onClick={() => setError('')} className="alert-close">×</button>
        </div>
      )}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={`tab ${activeTab === 'texts' ? 'active' : ''}`}
          onClick={() => setActiveTab('texts')}
        >
          Text Shares
        </button>
        <button 
          className={`tab ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Short Links
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="stats-section">
          <div className="grid grid-3">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{stats.activeTexts}</div>
              <div className="stat-label">Active Texts</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔗</div>
              <div className="stat-value">{stats.totalLinks}</div>
              <div className="stat-label">Total Links</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👆</div>
              <div className="stat-value">{stats.totalLinkHits}</div>
              <div className="stat-label">Total Clicks</div>
            </div>
          </div>

          <div className="admin-actions mt-4">
            <div className="card">
              <h3 className="card-title">Admin Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-warning" onClick={cleanup}>
                  🧹 Cleanup Expired Entries
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          </div>

          <div className="system-info mt-4">
            <div className="card">
              <h3 className="card-title">System Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Last Updated:</strong>
                  <span>{new Date(stats.timestamp).toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <strong>Text Auto-Delete:</strong>
                  <span>10 minutes</span>
                </div>
                <div className="info-item">
                  <strong>Rate Limit:</strong>
                  <span>100 requests per 15 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'texts' && (
        <div className="texts-section">
          <div className="section-header">
            <h2>Text Shares ({texts.length})</h2>
            <button className="btn btn-secondary" onClick={fetchTexts}>
              🔄 Refresh
            </button>
          </div>

          {loading && <div className="spinner"></div>}

          {texts.length === 0 ? (
            <div className="card text-center">
              <p className="text-muted">No active text shares found.</p>
            </div>
          ) : (
            <div className="data-table">
              <div className="table-header">
                <div>Code</div>
                <div>Content Preview</div>
                <div>Views</div>
                <div>Created</div>
                <div>Actions</div>
              </div>
              {texts.map(text => (
                <div key={text._id} className="table-row">
                  <div className="code-cell">{text.code}</div>
                  <div className="content-cell">
                    {text.content.substring(0, 50)}
                    {text.content.length > 50 && '...'}
                  </div>
                  <div className="views-cell">
                    {text.viewCount}
                    {text.maxViews && ` / ${text.maxViews}`}
                    {text.isOneTime && ' (One-time)'}
                  </div>
                  <div className="date-cell">
                    {new Date(text.createdAt).toLocaleString()}
                  </div>
                  <div className="actions-cell">
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => deleteText(text._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'links' && (
        <div className="links-section">
          <div className="section-header">
            <h2>Short Links ({links.length})</h2>
            <button className="btn btn-secondary" onClick={fetchLinks}>
              🔄 Refresh
            </button>
          </div>

          {loading && <div className="spinner"></div>}

          {links.length === 0 ? (
            <div className="card text-center">
              <p className="text-muted">No short links found.</p>
            </div>
          ) : (
            <div className="data-table">
              <div className="table-header">
                <div>Slug</div>
                <div>Original URL</div>
                <div>Clicks</div>
                <div>Created</div>
                <div>Expires</div>
                <div>Actions</div>
              </div>
              {links.map(link => (
                <div key={link._id} className="table-row">
                  <div className="slug-cell">
                    <a 
                      href={`${window.location.origin}/l/${link.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.slug}
                    </a>
                  </div>
                  <div className="url-cell">
                    <a 
                      href={link.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={link.originalUrl}
                    >
                      {link.originalUrl.substring(0, 40)}
                      {link.originalUrl.length > 40 && '...'}
                    </a>
                  </div>
                  <div className="clicks-cell">{link.hitCount}</div>
                  <div className="date-cell">
                    {new Date(link.createdAt).toLocaleString()}
                  </div>
                  <div className="expires-cell">
                    {link.expiresAt ? (
                      <span className={new Date(link.expiresAt) < new Date() ? 'text-danger' : ''}>
                        {new Date(link.expiresAt).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted">Never</span>
                    )}
                  </div>
                  <div className="actions-cell">
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => deleteLink(link._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .alert-close {
          background: none;
          border: none;
          color: inherit;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 1rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background-color: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .info-grid {
          display: grid;
          gap: 1rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background-color: var(--bg-tertiary);
          border-radius: 6px;
        }

        .data-table {
          background-color: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 100px 1fr 80px 150px 150px 80px;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-tertiary);
          font-weight: bold;
          border-bottom: 1px solid var(--border-color);
        }

        .table-row {
          display: grid;
          grid-template-columns: 100px 1fr 80px 150px 150px 80px;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-row:hover {
          background-color: var(--bg-tertiary);
        }

        .code-cell, .slug-cell {
          font-family: monospace;
          font-weight: bold;
        }

        .content-cell, .url-cell {
          word-break: break-all;
          font-size: 0.875rem;
        }

        .views-cell, .clicks-cell {
          text-align: center;
          font-weight: 500;
        }

        .date-cell, .expires-cell {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .actions-cell {
          display: flex;
          justify-content: center;
        }

        .btn-small {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .action-buttons {
            justify-content: center;
          }

          .section-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .table-header > div,
          .table-row > div {
            padding: 0.5rem;
            text-align: left;
          }

          .table-header > div {
            background-color: var(--accent-primary);
            color: white;
            border-radius: 4px;
            font-size: 0.875rem;
          }

          .table-row > div {
            border-bottom: 1px solid var(--border-color);
            word-break: break-word;
          }

          .actions-cell {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
