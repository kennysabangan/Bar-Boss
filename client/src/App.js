import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Items from './components/Items';
import ItemsAdd from './components/ItemsAdd';
import ItemsEdit from './components/ItemsEdit';
import BarArea from './components/BarArea';
import BarAreaEdit from './components/BarAreaEdit';

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
