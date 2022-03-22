import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import ItemsList from '../components/ItemList';
import ItemSidebar from '../components/ItemSidebar';

const Items = () => {

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
            <div className="m-4 ps-3 pt-1 d-flex gap-3 pe-5 w-100">
                <div className="col">
                    <ItemSidebar />
                </div>
                <div className="mx-5 ps-5 col-10">
                    <ItemsList products={products}/>
                </div>
            </div>
        </>
    )
}

export default Items;