import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Navigation = (props) => {

    let { showLogout, showNavbar, page, showDeleteBtn, barId } = props;

    const navigate = useNavigate();

    const logout = () => {
        axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    const deleteArea = () => {
        axios.delete('http://localhost:8000/api/locations/' + barId, {id: barId})
            .then(() => navigate('/dashboard'))
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex align-items-center justify-content-between m-5 px-5">
            <div className="d-flex gap-5">
                { showNavbar ?
                <Link to="/dashboard" className="d-flex gap-2 align-items-center logo">
                    <FontAwesomeIcon icon={faMartiniGlassCitrus} size="2x" flip="horizontal"/>
                    <h2 className="mt-2">Bar Boss</h2>
                </Link> :
                <Link to="/" className="d-flex gap-2 align-items-center logo">
                    <FontAwesomeIcon icon={faMartiniGlassCitrus} size="2x" flip="horizontal"/>
                    <h2 className="mt-2">Bar Boss</h2>
                </Link> }
                { showNavbar &&
                    <div className="ms-5">
                        <nav className="d-flex nav border border-2 border-dark">
                            <Link to="/dashboard" className={`p-3 px-5 nav-link ${page == "dashboard" ? "selected" : null}`}>Inventory</Link>
                            <Link to="/items" className={`p-3 px-5 nav-link ${page == "items" ? "selected" : null}`}>Add/Edit Items</Link>
                            {/* // TODO: RECIPES // <Link to="#" className={`p-3 px-5 nav-link ${page == "recipes" ? "selected" : null}`}>Recipes</Link> */}
                        </nav>
                    </div>
                }
            </div>
            <div>
                { showDeleteBtn && <button onClick={deleteArea} className="btn btn-danger me-4 px-4" style={{ height: "55px" }}>Delete Area</button> }
                { showLogout && <button onClick={logout} className="btn btn-dark px-4" style={{ height: "55px" }}>Log Out</button> }
            </div>
        </div>
)}

export default Navigation;