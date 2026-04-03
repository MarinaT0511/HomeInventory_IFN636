import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Home Master</Link>
      <div>
        {user ? (
          <>
            <Link to="/tasks" className="mr-4">CRUD</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1">Go to profile
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2" onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
