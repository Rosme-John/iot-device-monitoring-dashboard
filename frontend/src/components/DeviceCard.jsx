import { useMemo } from 'react';

export default function DeviceCard({ device, onUpdate, onDelete }) {
  const isOnline = device.status === 'online';
  const statusClass = isOnline ? 'device-card__status--online' : 'device-card__status--offline';

  const timeAgo = useMemo(() => {
    if (!device.lastUpdated) return 'N/A';
    const diffMs = Date.now() - new Date(device.lastUpdated).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }, [device.lastUpdated]);

  return (
    <div className="device-card">
      <div className="device-card__header">
        <div>
          <h3 className="device-card__name">{device.name}</h3>
          <div className={`device-card__status ${statusClass}`}>{device.status}</div>
        </div>
        <div className="device-card__actions">
          <button className="button button--small" onClick={() => onUpdate(device)}>
            Update
          </button>
          <button className="button button--danger button--small" onClick={() => onDelete(device)}>
            Delete
          </button>
        </div>
      </div>

      <div className="device-card__body">
        <div className="device-card__metric">
          <span className="label">Temp</span>
          <span className="value">{device.temperature ?? '—'}°C</span>
        </div>
        <div className="device-card__metric">
          <span className="label">Humidity</span>
          <span className="value">{device.humidity ?? '—'}%</span>
        </div>
        <div className="device-card__footer">Updated {timeAgo}</div>
      </div>
    </div>
  );
}
