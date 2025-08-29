export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test Page</h1>
      <div className="bg-blue-500 p-4 rounded-lg">
        <p className="text-white">If you can see red background and blue box, Tailwind is working!</p>
      </div>
      <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
        <p className="text-white">Gradient test</p>
      </div>
      <div className="mt-4 bg-background text-foreground p-4 border border-border rounded-lg">
        <p>Custom CSS variables test</p>
      </div>
    </div>
  );
}
