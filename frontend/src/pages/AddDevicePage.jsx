import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AddDevicePage() {
  const [deviceId, setDeviceId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!deviceId.trim() || !name.trim()) {
      setError('Device ID and name are required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/devices`, { deviceId: deviceId.trim(), name: name.trim() });
      navigate('/devices');
    } catch (err) {
      setError('Failed to register device. Is the Device ID already in use?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1>Add Device</h1>
        <p className="page__subheading">Register a new device to track status and sensor readings.</p>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span className="form__label">Device ID</span>
          <input
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="e.g. device-123"
            required
          />
        </label>

        <label className="form__field">
          <span className="form__label">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Office Sensor"
            required
          />
        </label>

        <button className="button" type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Register Device'}
        </button>
      </form>
    </div>
  );
}
