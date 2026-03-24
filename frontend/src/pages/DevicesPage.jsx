import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DeviceCard from '../components/DeviceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/devices`);
      setDevices(data);
    } catch (err) {
      setError('Unable to fetch devices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (device) => {
    const status = device.status === 'online' ? 'offline' : 'online';
    const temperature = device.temperature ?? 0;
    const humidity = device.humidity ?? 0;

    try {
      await axios.put(`${API_BASE}/devices/${device._id}`, {
        status,
        temperature,
        humidity,
      });
      fetchDevices();
    } catch (err) {
      setError('Unable to update device.');
    }
  };

  const handleDelete = async (device) => {
    if (!window.confirm(`Delete device "${device.name}"?`)) return;

    try {
      await axios.delete(`${API_BASE}/devices/${device._id}`);
      fetchDevices();
    } catch (err) {
      setError('Unable to delete device.');
    }
  };

  const stats = useMemo(() => {
    const total = devices.length;
    const online = devices.filter((d) => d.status === 'online').length;
    const offline = total - online;
    return { total, online, offline };
  }, [devices]);

  return (
    <div className="page">
      <header className="page__header">
        <h1>Devices</h1>
        <div className="summary">
          <div className="summary__item">
            <div className="summary__title">Total</div>
            <div className="summary__value">{stats.total}</div>
          </div>
          <div className="summary__item">
            <div className="summary__title">Online</div>
            <div className="summary__value">{stats.online}</div>
          </div>
          <div className="summary__item">
            <div className="summary__title">Offline</div>
            <div className="summary__value">{stats.offline}</div>
          </div>
        </div>
      </header>
      {error && <div className="alert alert--error">{error}</div>}
        <div className="devices-grid">
          {devices.map((device) => (
            <DeviceCard
              key={device._id}
              device={device}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
    </div>
  );
}
