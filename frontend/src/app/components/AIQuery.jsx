import { useState } from 'react';
import { Button } from './ui/button';

import * as api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Login } from './Auth/Login';

export function AIQuery({ initialPrompt = '' }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError(null);
    setResult(null);
    if (!prompt) return setError('Please enter a prompt');
    if (!user) {
      setShowLogin(true);
      return setError('Please sign in to use the AI');
    }
    setLoading(true);
    try {
      const res = await api.aiQuery(prompt);
      setResult(res.record || res);
    } catch (err) {
      setError(err.message || 'Failed to call AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 animate-fade-in">
      <h4 className="text-lg font-semibold mb-3">Ask HUMAIRE (AI)</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded p-3 min-h-[120px] focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="Enter an instruction or question for the AI"
        />
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 text-white" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Processing...' : 'Send to AI'}
          </Button>
          <Button variant="ghost" onClick={() => { setPrompt(''); setResult(null); setError(null); }}>
            Clear
          </Button>
        </div>
      </form>

      {error && <p className="text-sm text-red-600 mt-3 animate-slide-in-right">{error}</p>}

      {result && (
        <div className="mt-4 bg-gray-50 border p-4 rounded animate-slide-up">
          <h5 className="font-semibold mb-2">AI Response</h5>
          <pre className="whitespace-pre-wrap text-sm">{result.response || JSON.stringify(result, null, 2)}</pre>
          <p className="text-xs text-gray-500 mt-2">Saved at: {new Date(result.createdAt || result.record?.createdAt || Date.now()).toLocaleString()}</p>
        </div>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}
