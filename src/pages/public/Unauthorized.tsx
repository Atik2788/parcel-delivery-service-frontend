

export const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-chart-3 text-background">
      <h1 className="text-4xl font-bold mb-4">🚫 Unauthorized</h1>
      <p className="mb-6">You do not have permission to view this page.</p>

      <a
        href="/"
        className="bg-primary px-4 py-2 rounded text-background"
      >
        Go Home
      </a>
    </div>
  );
};