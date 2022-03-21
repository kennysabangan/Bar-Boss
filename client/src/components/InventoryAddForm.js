import { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryAddForm = (props) => {
    const [ itemId, setItemId ] = useState("");
    const [ quantity, setQuantity ] = useState(1);
    const [ errors, setErrors ] = useState([]);

    const [ products, setProducts ] = useState([]);
    const { barId } = props;

    function addToInventory(e) {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/locations/${barId}/add`, {
            itemId: itemId,
            quantity: quantity,
        }, { withCredentials: true })
            .then((res) => {
                refreshPage();
                setQuantity(1);
                setErrors([]);
            })
            .catch(err => setErrors(err.response.data.errors))
    }

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                setProducts(res.data);
                setItemId(res.data[0]._id);
            })
    }, [])

    return (
        <form onSubmit={addToInventory} className="border border-dark py-2 pb-3 px-5 mt-4 ms-5">
            <div className="mb-2">
            </div>
            <div className="form-row d-flex gap-5 align-items-center">
                <h4>Add New Product to Inventory:</h4>
                <div className="form-group col">
                    <label>Product Name:</label>
                    <select className="form-select" value={itemId} onChange={e => setItemId(e.target.value)}>
                        { products.map((product, idx) => (
                            <option key={idx} value={product._id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-2">
                    <label>Quantity:</label>
                    {errors.quantity ? <div className="text-danger ms-4">* {errors.quantity.message}</div> : null}
                    <input className="form-control" type="number" value={quantity} onChange={e => setQuantity(e.target.value)}/>
                </div>
                <div className="col-3">
                    <button className="btn btn-success mt-3 px-5">Add New Item</button>
                </div>
            </div>
        </form>
    )
}

export default InventoryAddForm;