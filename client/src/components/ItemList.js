import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemsList = (props) => {

    let { products, setProducts, showActions, productId, update, setUpdate } = props;
    const [ name, setName ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ unitQty, setUnitQty ] = useState("");
    const [ units, setUnits ] = useState("");
    const [ container, setContainer ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();

    function removeItem(e) {
        axios.delete('http://localhost:8000/api/products/' + e.target.id)
            .then(() => {
                const filteredProducts = products.filter(product => product._id != e.target.id)
                setProducts([...filteredProducts]);
            })
            .catch(err => console.log(err));
    }

    function updateItem() {
        axios.put('http://localhost:8000/api/products/' + productId, {
            name, category, type, unitQty, units, container, price
        }, { new: true })
            .then(() => {
                navigate('/items/edit');
                setUpdate(!update);
            })
            .catch(err => setErrors(err.response.data.errors))
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + productId)
            .then(res => {
                setName(res.data.name);
                setCategory(res.data.category);
                setType(res.data.type);
                setUnitQty(res.data.unitQty);
                setUnits(res.data.units);
                setContainer(res.data.container);
                setPrice(res.data.price);
            })
            .catch(err => console.log(err))
    }, [props, update])

    return ( products &&
        <table className="table table-bordered border-dark mt-4 text-center align-middle" style={{ border: "3px solid black" }}>
            <thead>
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Unit Qty</th>
                    <th scope="col">Units</th>
                    <th scope="col">Container Type</th>
                    <th scope="col">Price</th>
                    { showActions && <th scope="col">Actions</th>}
                </tr>
            </thead>
            <tbody>
                { products.map((product, idx) => (
                    <tr key={idx}>
                        <td>
                            { product._id != productId ? <Link className="font-bold" to={`/items/edit/${product._id}`}>{product.name}</Link> : <input className="border border-1 text-center" value={name} onChange={e => setName(e.target.value)}/>}
                            { product._id == productId && errors.name ? <span className="text-danger"><br/><small>*{errors.name.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span className="px-4 mx-3">{product.category}</span> : <input className="border border-1 text-center" value={category} onChange={e => setCategory(e.target.value)}/>}
                            { product._id == productId && errors.category ? <span className="text-danger"><br/><small>*{errors.category.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span className="px-3">{product.type}</span> : <input className="border border-1 text-center" value={type} onChange={e => setType(e.target.value)}/>}
                            { product._id == productId && errors.type ? <span className="text-danger"><br/><small>*{errors.type.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span>{product.unitQty}</span> : <input className="border border-1 text-center w-50" value={unitQty} onChange={e => setUnitQty(e.target.value)}/>}
                            { product._id == productId && errors.unitQty ? <span className="text-danger"><br/><small>*{errors.unitQty.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span>{product.units}</span> : <input className="border border-1 text-center w-50" value={units} onChange={e => setUnits(e.target.value)}/>}
                            { product._id == productId && errors.units ? <span className="text-danger"><br/><small>*{errors.units.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span>{product.container}</span> : <input className="border border-1 text-center w-75" value={container} onChange={e => setContainer(e.target.value)}/>}
                            { product._id == productId && errors.container ? <span className="text-danger"><br/><small>*{errors.container.message}</small></span> : null}
                        </td>
                        <td>
                            { product._id != productId ? <span className="px-4">${product.price}</span> : <input className="border border-1 text-center w-75" value={price} onChange={e => setPrice(e.target.value)}/>}
                            { product._id == productId && errors.price ? <span className="text-danger"><br/><small>*{errors.price.message}</small></span> : null}
                        </td>
                        { showActions && product._id != productId &&
                            <td className="d-flex border-0 justify-content-center">
                                <Link to={`/items/edit/${product._id}`} className="btn btn-primary px-4 me-4">Edit</Link>
                                <button onClick={removeItem} id={product._id} className="btn btn-danger px-3 ms-2">Delete</button>
                            </td>
                        }
                        { showActions && product._id == productId &&
                            <td className="d-flex justify-content-center border-0 ">
                                <button onClick={updateItem} className="btn btn-success w-100">Save Changes</button>
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ItemsList;