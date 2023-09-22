import './App.css';
import './assets/css/styles.min.css'
import './assets/scss/styles.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes'
const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const Loading =
  <div className="d-flex justify-content-center vh-100 align-items-center">
    <div className="spinner-grow text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
const routing = routes.map((route) => {
  return (
    route.element && {
      path: route.path,
      element: <route.element />,
      exact: route.exact,
      name: route.name
    }
  )
})
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: routing
  }

]);
function App() {
  return (
    <div>
      <Suspense fallback={Loading}>
        <RouterProvider router={router} fallbackElement={Loading} />

      </Suspense>
    </div>
  );
}

export default App;
