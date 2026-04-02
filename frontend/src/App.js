import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';
import Test from "./pages/Test";
import ItemList from './pages/ItemList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/itemdetail" element={<ItemDetail />} />
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
