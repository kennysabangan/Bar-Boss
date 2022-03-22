import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navigation from '../components/Navigation';
import InventoryList from '../components/InventoryList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const Dashboard = () => {

    const [ locations, setLocations ] = useState([]);
    const [ showAddInput, setShowAddInput ] = useState(false)
    const [ areaName, setAreaName ] = useState("");

    // If user is not logged in, redirect to Registration Page
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('usertoken')) {
            navigate('/');
        }

        axios.get('http://localhost:8000/api/locations')
        .then(res => {
            setLocations(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    function addArea() {
        axios.post('http://localhost:8000/api/locations/create', { name: areaName })
            .then(res => {
                refreshPage();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Navigation showLogout={true} showNavbar={true} page="dashboard" />
            <div className="m-4 ps-3 pt-1 d-flex">
                <div className="col d-flex flex-column">
                    <h6 className="ms-5 my-4 py-2 border border-2 border-dark rounded text-center bar-area">Bar Areas</h6>
                    <Link to="/dashboard" className="row d-flex ms-5 btn">
                        <div className="col-2">
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                        <div className="col-auto">Full Inventory</div>
                    </Link>
                    { locations && locations.map((location, idx) => (
                        <Link to={`/dashboard/${location._id}`} key={idx} className="row d-flex ms-5 btn">
                            <div className="col-2">
                            </div>
                            <div className="col-auto">{location.areaName}</div>
                        </Link>
                    ))}
                    { showAddInput && <input className="ms-5 mt-3 text-center" value={areaName} onChange={e => setAreaName(e.target.value)} placeholder="ex: Storage, Front Bar"/>}
                    { !showAddInput ? <button onClick={() => setShowAddInput(true)} className="btn btn-secondary ms-5 mt-3">Add Area</button>
                        : <button onClick={addArea} className="btn btn-dark ms-5 mt-2">Save Area</button>}
                </div>
                <div className="col-10 ps-2 pe-4 me-5">
                    <InventoryList />
                </div>
            </div>
        </>
    )
}

export default Dashboard