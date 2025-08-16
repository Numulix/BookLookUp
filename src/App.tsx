import { Layout } from './components/layout/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { ViewedBooksProvider } from './context/ViewedBooksContext.tsx';
import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import { BookDetailsPage, LandingPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/books/:id',
    Component: BookDetailsPage,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ViewedBooksProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </ViewedBooksProvider>
    </Provider>
  );
}

export default App;
