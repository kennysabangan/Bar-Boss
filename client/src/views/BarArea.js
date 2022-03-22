import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import InventoryAddForm from '../components/InventoryAddForm';

const BarArea = () => {

    const [ locations, setLocations ] = useState([]);
    const [ inventory, setInventory ] = useState([]);
    const { id } = useParams();
    const [ update, setUpdate ] = useState(false);

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        axios.get('http://localhost:8000/api/locations')
            .then(res => setLocations(res.data))

        axios.get('http://localhost:8000/api/locations/' + id)
            .then(res => {
                var data = res.data.inventory;
                var concatInventory = []

                data.map((item) => {
                    if (isProductUnique(concatInventory, item)) {
                        concatInventory.push(item);
                    } else {
                        findProductAddQuantity(concatInventory, item);
                    }
                })
                setInventory([...concatInventory])
            })

    }, [id, update])

    function isProductUnique(arr, item) {
        let unique = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].product._id == item.product._id) {
                return false;
            }
        }
        return unique
    }

    function findProductAddQuantity(arr, item) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].product._id == item.product._id) {
                arr[i].quantity += item.quantity
            }
        }
    }

    return (
        <>
            <Navigation showLogout={true} showNavbar={true} page="dashboard" showDeleteBtn={true} barId={id} />
            <div className="m-4 ps-3 pt-1 d-flex">
                <div className="col d-flex flex-column">
                    <h6 className="ms-5 my-4 py-2 border border-2 border-dark rounded text-center bar-area">Bar Areas</h6>
                    <Link to="/dashboard" className="row d-flex ms-5 btn">
                        <div className="col-2">
                            { !id && <FontAwesomeIcon icon={faAngleRight}/> }
                        </div>
                        <div className="col-auto">Full Inventory</div>
                    </Link>
                    { locations && locations.map((location, idx) => (
                        <Link to={`/dashboard/${location._id}`} key={idx} className="row d-flex ms-5 btn">
                            <div className="col-2">
                            { id == location._id ? <FontAwesomeIcon icon={faAngleRight}/> : null }
                            </div>
                            <div className="col-auto">{location.areaName}</div>
                        </Link>
                    ))}
                </div>
                <div className="col-10 ps-2 pe-5 me-5">

                    <InventoryAddForm barId={id} update={update} setUpdate={setUpdate} />

                    <table className="table table-bordered border-dark mx-5 mt-4 text-center align-middle" style={{ border: "3px solid black" }}>
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Type</th>
                                <th scope="col">Size</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { inventory && inventory.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.category}</td>
                                    <td>{item.product.type}</td>
                                    <td>{item.product.unitQty}{item.product.units} {item.product.container}</td>
                                    <td>{item.quantity}</td>
                                    <td className="d-flex border-0 justify-content-center">
                                        <Link to={`/dashboard/${id}/${item._id}`} className="btn btn-primary px-4 me-4">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default BarArea