import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getHomePath = () => {
    if (!user) return "/";
    if (user.role === "R001") return "/admindashboard";
    if (user.role === "R002") return "/inventory";
    return "/";
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to={getHomePath} className="text-2xl font-bold">Home Master</Link>
        {user && user?.role !== "R002" && (
          <Link to="/admindashboard" className="ml-6">Admin Dashboard</Link>
        )}
        {user && (
          <Link to="/inventory" className="ml-6">
            {user?.role === "R001" ? 'Inventory Management' : 'My inventory'}
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1" onClick={handleNavProfile} className=" px-4 py-2 rounded hover:bg-blue-700">Go to profile
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
