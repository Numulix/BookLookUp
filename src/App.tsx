import { Layout } from './components/layout/Layout.tsx';

function App() {
  return (
    <Layout>
      <div className="py-16 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">Welcome to Book Look Up 📚👀⬆️</h2>
        <p className="mx-auto max-w-2xl text-gray-600">Look up books using the Open Library API</p>
      </div>
    </Layout>
  );
}

export default App;
