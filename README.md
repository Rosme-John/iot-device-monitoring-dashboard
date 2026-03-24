<<<<<<< HEAD
# iot-device-monitoring-dashboard
Real-time IoT device monitoring system using Node.js, WebSocket, and MongoDB
=======
# IoT Device Monitoring Dashboard

A full-stack IoT device monitoring dashboard built with **Node.js + Express** (backend) and **React** (frontend).

## Features

- Register and manage IoT devices
- Update device status (online/offline) and sensor values (temperature, humidity)
- Dashboard with charts and real-time data updates (polling)
- Responsive UI with modern styling

## Folder Structure

- `backend/` - Express API server
- `frontend/` - React UI

## Getting Started

### Prerequisites

- Node.js 18+ (or compatible LTS)
- npm
- MongoDB (local or hosted)

### Setup

1. Clone the repository

```bash
git clone <repo-url>
cd iot-device-monitoring-dashboard
```

2. Configure environment variables

- Copy the `.env.example` file to `.env` in the backend folder and adjust values.

3. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

4. Start the backend and frontend

In separate terminals:

```bash
cd backend
npm start
```

```bash
cd frontend
npm start
```

## API Endpoints

- `POST /api/devices` - Register a new device
- `GET /api/devices` - List all devices
- `PUT /api/devices/:id` - Update device status
- `DELETE /api/devices/:id` - Delete a device

## Notes

- Backend uses MongoDB with Mongoose.
- Frontend uses Axios for API calls.

---

If you have questions or need help, feel free to open an issue.
>>>>>>> 44fd29f (Initial commit)
