import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DashboardPage() {
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
      setError('Unable to load device data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 8000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    return devices
      .slice()
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
      .slice(0, 10)
      .map((device) => ({
        name: device.name,
        temperature: device.temperature ?? 0,
        humidity: device.humidity ?? 0,
      }));
  }, [devices]);

  const onlineCount = useMemo(() => devices.filter((d) => d.status === 'online').length, [devices]);
  const offlineCount = useMemo(() => devices.filter((d) => d.status === 'offline').length, [devices]);

  return (
    <div className="page">
      <header className="page__header">
        <h1>Dashboard</h1>
        <p className="page__subheading">View your device performance and status in real time.</p>
      </header>

      {error && <div className="alert alert--error">{error}</div>}
        <div className="dashboard">
          <div className="dashboard__stats">
            <div className="card">
              <div className="card__title">Total Devices</div>
              <div className="card__value">{devices.length}</div>
            </div>
            <div className="card">
              <div className="card__title">Online</div>
              <div className="card__value">{onlineCount}</div>
            </div>
            <div className="card">
              <div className="card__title">Offline</div>
              <div className="card__value">{offlineCount}</div>
            </div>
          </div>

          <div className="dashboard__charts">
            <div className="chart-card">
              <div className="chart-card__title">Temperature (°C)</div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#FF5A5F" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <div className="chart-card__title">Humidity (%)</div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="humidity" stroke="#3091F6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
  );
}
