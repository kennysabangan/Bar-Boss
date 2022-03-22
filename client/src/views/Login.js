import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from '../components/Navigation';

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/login', {
            email, password
        }, { withCredentials: true })
            .then(() => {
                navigate('/dashboard');
            })
            .catch(() => {
                setPassword("");
                setError("Invalid credentials. Note: Fields are case-sensitive.")
            })
        }

    return (
        <>
            <Navigation showLogout={false} />
            <div className="row mx-5">
                <div className="col mt-5" style={{ marginLeft: "15vw" }}>
                    <h1 className="display-4 mb-4 mt-5">
                        The Only Way To<br/>
                        Manage a Bar
                    </h1>
                    <h3>Bar Boss manages your inventory,</h3>
                    <h3>keeps track of your recipes & costs,</h3>
                    <h3>& provides deep insights of your bar</h3>
                    <h3>for you to be the best Bar Boss.</h3>
                </div>

                <div className="col d-flex justify-content-center align-items-center mt-5" style={{ marginRight: "15vw" }}>
                    <form onSubmit={loginUser} className="border border-4 border-dark px-5 py-4" style={{ borderRadius: "15px" }}>
                        <h3>Welcome back, Boss! Login Here!</h3>
                        {error ? <div className="text-danger ms-4">* {error}</div> : null}
                        <div className="form-row mt-3">
                            <label>Work Email</label>
                            <input required type="email" className="form-control" placeholder="johndoe@mail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input required type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button className="btn btn-primary w-100 mt-3 rounded" type="submit">Login</button>

                        <p className="mt-3">Need to create an Account? <Link to="/">Register Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;