export default function LoadingSpinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading">
      <div className="spinner__dot"></div>
      <div className="spinner__dot"></div>
      <div className="spinner__dot"></div>
    </div>
  );
}
