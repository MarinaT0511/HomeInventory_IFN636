import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';
import Inventory from './pages/Inventory';
import AdminDashboard from './pages/AdminDashboard';

import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/itemdetail" element={<ItemDetail />} /> */}
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/test" element={<Test />} />

        <Route path="/inventory/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
