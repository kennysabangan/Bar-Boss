import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import ItemsList from './ItemList';
import ItemSidebar from './ItemSidebar';
import ItemsEditSidebar from './ItemsEditSidebar';

const ItemsEdit = () => {

    const [ products, setProducts ] = useState([]);
    const [ update, setUpdate ] = useState(false);
    const { id } = useParams();

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        axios.get('http://localhost:8000/api/products', { withCredentials: true })
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }, [update])

    return (
        <>
            <Navigation showLogout={true} showNavbar={true} page="items" />
            <div className="m-4 ps-3 pt-1 d-flex gap-3 pe-5 w-100">
                <div className="col">
                    <ItemsEditSidebar />
                </div>
                <div className="ms-4 me-5 col-10 ps-5">
                    <ItemsList products={products} setProducts={setProducts} showActions={true} productId={id} update={update} setUpdate={setUpdate} />
                </div>
            </div>
        </>
    )
}

export default ItemsEdit;