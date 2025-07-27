import React, { useState } from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const TextShare = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [createData, setCreateData] = useState({
    content: '',
    isOneTime: false,
    maxViews: ''
  });
  const [retrieveCode, setRetrieveCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: createData.content,
          isOneTime: createData.isOneTime,
          maxViews: createData.maxViews ? parseInt(createData.maxViews) : null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          type: 'success',
          code: data.code,
          expiresAt: data.expiresAt
        });
        setCreateData({ content: '', isOneTime: false, maxViews: '' });
      } else {
        setError(data.message || 'Failed to create text');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/text/${retrieveCode}`);
      const data = await response.json();

      if (response.ok) {
        setResult({
          type: 'retrieve',
          content: data.content,
          viewCount: data.viewCount,
          isOneTime: data.isOneTime,
          maxViews: data.maxViews,
          createdAt: data.createdAt
        });
        setRetrieveCode('');
      } else {
        setError(data.message || 'Failed to retrieve text');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  const formatExpiryTime = (expiresAt) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffMs = expiry - now;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    if (diffMs <= 0) return 'Expired';
    return `${diffMins}m ${diffSecs}s`;
  };

  return (
    <div className="text-share-page">
      <div className="page-header text-center mb-4">
           <AdBanner />
        <h1>Text Sharing</h1>
        <p className="text-muted">
          Share text securely with a 4-digit code. All texts auto-delete after 10 minutes.
        </p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Text
        </button>
        <button 
          className={`tab ${activeTab === 'retrieve' ? 'active' : ''}`}
          onClick={() => setActiveTab('retrieve')}
        >
          Retrieve Text
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="create-section">
          <div className="card">
            <h2 className="card-title">Create New Text</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Your Text</label>
                <textarea
                  className="form-textarea"
                  value={createData.content}
                  onChange={(e) => setCreateData({...createData, content: e.target.value})}
                  placeholder="Enter your text here... (max 50,000 characters)"
                  required
                  maxLength={50000}
                  rows={8}
                />
                <small className="text-muted">
                  {createData.content.length}/50,000 characters
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={createData.isOneTime}
                    onChange={(e) => setCreateData({...createData, isOneTime: e.target.checked})}
                  />
                  One-time view (delete after first view)
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Views (optional)</label>
                <input
                  type="number"
                  className="form-input"
                  value={createData.maxViews}
                  onChange={(e) => setCreateData({...createData, maxViews: e.target.value})}
                  placeholder="Leave empty for unlimited views"
                  min="1"
                  max="100"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Text Share'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'retrieve' && (
        <div className="retrieve-section">
          <div className="card">
            <h2 className="card-title">Retrieve Text</h2>
            <form onSubmit={handleRetrieve}>
              <div className="form-group">
                <label className="form-label">4-Digit Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={retrieveCode}
                  onChange={(e) => setRetrieveCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter 4-digit code"
                  required
                  maxLength={4}
                  pattern="[0-9]{4}"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading || retrieveCode.length !== 4}>
                {loading ? 'Retrieving...' : 'Retrieve Text'}
              </button>
            </form>
          </div>
        </div>
      )}
<BannerAdBox />
      {result && (
        <div className="result-section mt-4">
          {result.type === 'success' && (
            <div className="card">
              <h3 className="card-title text-success">✅ Text Created Successfully!</h3>
              <div className="code-display">
                <strong>{result.code}</strong>
                <button 
                  className="btn btn-secondary ml-2"
                  onClick={() => copyToClipboard(result.code)}
                >
                  Copy Code
                </button>
              </div>
              <div className="expiry-info">
                <p className="text-muted">
                  <strong>Expires in:</strong> {formatExpiryTime(result.expiresAt)}
                </p>
                <p className="text-muted">
                  Share this 4-digit code with others to let them access your text.
                </p>
              </div>
            </div>
          )}

          {result.type === 'retrieve' && (
            <div className="card">
              <h3 className="card-title">Retrieved Text</h3>
              <div className="text-content">
                <textarea
                  className="form-textarea"
                  value={result.content}
                  readOnly
                  rows={8}
                />
              </div>
              <div className="text-info mt-2">
                <p className="text-muted">
                  <strong>Views:</strong> {result.viewCount}
                  {result.maxViews && ` / ${result.maxViews}`}
                </p>
                <p className="text-muted">
                  <strong>Created:</strong> {new Date(result.createdAt).toLocaleString()}
                </p>
                {result.isOneTime && (
                  <p className="text-warning">
                    ⚠️ This was a one-time view text and has been deleted.
                  </p>
                )}
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => navigator.clipboard.writeText(result.content)}
              >
                Copy Text
              </button>
            </div>
          )}
        </div>
      )}

      <div className="info-section mt-4">
        <div className="card">
          <h3 className="card-title">How it works</h3>
          <ul>
            <li>📝 Type or paste your text (up to 50,000 characters)</li>
            <li>🔢 Get a unique 4-digit code</li>
            <li>📤 Share the code with anyone</li>
            <li>⏰ Text automatically deletes after 10 minutes</li>
            <li>👁️ Set view limits or one-time viewing</li>
            <li>🔒 No registration required</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .code-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .text-content textarea {
          font-family: monospace;
        }

        .expiry-info {
          text-align: center;
          margin-top: 1rem;
        }

        .text-info {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .info-section ul {
          list-style: none;
          padding: 0;
        }

        .info-section li {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .info-section li:last-child {
          border-bottom: none;
        }

        .ml-2 {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default TextShare;
