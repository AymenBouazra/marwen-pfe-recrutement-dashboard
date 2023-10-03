import './App.css';
import './assets/css/styles.min.css'
import './assets/scss/styles.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.min.css'
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes'
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './private-route/PrivateRoute';
import { CoockieContext } from './features/contexts';
import { decodeToken, getCookie } from './utils/functions';
const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./components/auth/Login'));
const AccountConfirmation = lazy(() => import('./components/auth/AccountConfirmation'));
const ForgetPassword = lazy(() => import('./components/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const AddPasswordToCandidat = lazy(() => import('./components/auth/AddPasswordToCandidat'));
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
    path: "/account-confirmation",
    element: <AccountConfirmation />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/new-password",
    element: <AddPasswordToCandidat />,
  },
  {
    path: '/',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    children: routing
  }

]);


function App() {
  const token = decodeToken(getCookie('token'))

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CoockieContext.Provider value={token}>
        <Suspense fallback={Loading}>
          <RouterProvider router={router} fallbackElement={Loading} />
        </Suspense>
      </CoockieContext.Provider>

    </div>
  );
}

export default App;
