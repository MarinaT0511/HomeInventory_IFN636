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
        <Route path="/profile/:userId" element={<Profile />} />
        {/* <Route path="/itemdetail" element={<ItemDetail />} /> */}
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/inventory/item/new" element={<ItemDetail mode="create" />} />
        <Route path="/inventory/item/:itemId" element={<ItemDetail mode="view" />} />
        <Route path="/inventory/item/:itemId/edit" element={<ItemDetail mode="edit" />} />
      </Routes>
    </Router>
  );
}

export default App;
