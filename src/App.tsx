import { Layout } from './components/layout/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { ViewedBooksProvider } from './context/ViewedBooksContext.tsx';
import { SearchBar } from './components/ui/SearchBar.tsx';

function App() {
  return (
    <Provider store={store}>
      <ViewedBooksProvider>
        <Layout>
          <div className="py-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-gray-800">Welcome to Book Look Up 📚👀⬆️</h2>
            <p className="mx-auto max-w-2xl text-gray-600">Look up books using the Open Library API</p>
          </div>
          {/*<Search />*/}
          <SearchBar
            onSearch={() => {
              console.log('Debounced');
            }}
            onClear={() => {}}
          />
        </Layout>
      </ViewedBooksProvider>
    </Provider>
  );
}

export default App;
