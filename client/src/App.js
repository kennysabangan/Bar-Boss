import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Items from './views/Items';
import ItemsAdd from './views/ItemsAdd';
import ItemsEdit from './views/ItemsEdit';
import BarArea from './views/BarArea';
import BarAreaEdit from './views/BarAreaEdit';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="me-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<BarArea />} />
          <Route path="/dashboard/:id/:inventoryId" element={<BarAreaEdit />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/add" element={<ItemsAdd />} />
          <Route path="/items/edit" element={<ItemsEdit />} />
          <Route path="/items/edit/:id" element={<ItemsEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
