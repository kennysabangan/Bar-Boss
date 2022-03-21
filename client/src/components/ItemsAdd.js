import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import ItemsList from './ItemList';
import ItemAddSidebar from './ItemsAddSidebar';
import ItemsAddForm from './ItemsAddForm';

const ItemsAdd = () => {

    const [ products, setProducts ] = useState([]);

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Navigation showLogout={true} showNavbar={true} page="items" />
            <div className="m-4 ps-3 pt-1 d-flex gap-3">
                <ItemAddSidebar />
                <div className="mx-5 col-10">
                    <ItemsAddForm products={products} setProducts={setProducts} />
                    <ItemsList products={products} setProducts={setProducts} />
                </div>
            </div>
        </>
    )
}

export default ItemsAdd;