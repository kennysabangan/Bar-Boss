import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css';

const Register = () => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ establishment, setEstablishment ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('usertoken')) {
            navigate('/dashboard');
        }
    }, [])

    const registerUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', {
            firstName, lastName, email, phone, establishment, password, confirmPassword
        }, { withCredentials: true})
            .then(() => {
                navigate('/dashboard');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            })
        }


    return (
        <>
            <Navigation showLogout={false} />
            <div className="row mx-5">
                <div className="col mt-5" style={{ marginLeft: "15vw" }}>
                    <h1 className="display-4 mb-4 mt-5">
                        The Only Way To
                        <br/>Manage a Bar
                    </h1>
                    <h3>Bar Boss manages your inventory,</h3>
                    <h3>keeps track of your recipes & costs,</h3>
                    <h3>& provides deep insights of your bar</h3>
                    <h3>for you to be the best Bar Boss.</h3>
                </div>

                <div className="col d-flex justify-content-center" style={{ marginRight: "15vw" }}>
                    <form onSubmit={registerUser} className="border border-4 border-dark px-5 py-4" style={{ borderRadius: "15px" }}>
                        <h3>Create Your Free Account Today!</h3>
                        {errors.firstName ? <div className="text-danger ms-4">* {errors.firstName.message}</div> : null}
                        {errors.lastName ? <div className="text-danger ms-4">* {errors.lastName.message}</div> : null}
                        {errors.email ? <div className="text-danger ms-4">* {errors.email.message}</div> : null}
                        {errors.phone ? <div className="text-danger ms-4">* {errors.phone.message}</div> : null}
                        {errors.establishment ? <div className="text-danger ms-4">* {errors.establishment.message}</div> : null}
                        {errors.password ? <div className="text-danger ms-4">* {errors.password.message}</div> : null}
                        {errors.confirmPassword ? <div className="text-danger ms-4">* {errors.confirmPassword.message}</div> : null}
                        <div className="form-row d-flex gap-3 mt-3">
                            <div className="form-group">
                                <label>First Name</label>
                                <input required type="text" className="form-control" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input required type="text" className="form-control" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Work Email</label>
                            <input required type="email" className="form-control" placeholder="johndoe@mail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Phone Number</label>
                            <input required type="text" className="form-control" placeholder="555-555-5555" value={phone} onChange={e => setPhone(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Establishment Name</label>
                            <input required type="text" className="form-control" placeholder="John Doe's Bar" value={establishment} onChange={e => setEstablishment(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input required type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <input required type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        </div>
                        <button className="btn btn-primary w-100 mt-3 rounded" type="submit">Get Started</button>

                        <p className="mt-3">Already have an Account? <Link to="/login">Login Here</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;