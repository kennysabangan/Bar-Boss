import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
