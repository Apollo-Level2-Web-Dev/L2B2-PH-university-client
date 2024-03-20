import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { adminPaths } from './admin.routes';
import { routeGenerator } from '../utils/routesGenerator';
import { facultyPaths } from './faculty.routes';
import { studentPaths } from './student.routes';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ChangePassword from '../pages/ChangePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/faculty',
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
