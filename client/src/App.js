import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Items from './views/Items';
import ItemsAdd from './views/ItemsAdd';
import ItemsEdit from './views/ItemsEdit';
import BarAreaEdit from './views/BarAreaEdit';
import Toaster from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard page="Dashboard"/>} />
        <Route path="/dashboard/:id" element={<Dashboard page="Bar Area"/>} />
        <Route path="/items" element={<Dashboard page="Items"/>} />
        <Route path="/recipes" element={<Dashboard page="Recipes"/>} />
        {/* <Route path="/dashboard/:id/:inventoryId" element={<BarAreaEdit />} /> */}
        {/* <Route path="/items/add" element={<ItemsAdd />} />
        <Route path="/items/edit" element={<ItemsEdit />} />
        <Route path="/items/edit/:id" element={<ItemsEdit />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
