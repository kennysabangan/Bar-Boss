import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ItemsAddForm = (props) => {
    const [ name, setName ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ type, setType ] = useState("");
    const [ unitQty, setUnitQty ] = useState("");
    const [ units, setUnits ] = useState("");
    const [ container, setContainer ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const { products, setProducts } = props;

    function addItem(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/api/products/add', {
            name,
            category,
            type,
            unitQty,
            units,
            container,
            price
        }, { withCredentials: true })
            .then((res) => {
                setProducts([...products, res.data])
                setName("");
                setCategory("");
                setType("");
                setUnitQty("");
                setUnits("");
                setContainer("");
                setPrice("")
                setErrors([]);
            })
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <form onSubmit={addItem} className="border border-dark border-3 py-4 px-5 mt-4">
            <div className="mb-2">
                {errors.name ? <div className="text-danger ms-4">* {errors.name.message}</div> : null}
                {errors.category ? <div className="text-danger ms-4">* {errors.category.message}</div> : null}
                {errors.type ? <div className="text-danger ms-4">* {errors.type.message}</div> : null}
                {errors.unitQty ? <div className="text-danger ms-4">* {errors.unitQty.message}</div> : null}
                {errors.units ? <div className="text-danger ms-4">* {errors.units.message}</div> : null}
                {errors.container ? <div className="text-danger ms-4">* {errors.container.message}</div> : null}
                {errors.price ? <div className="text-danger ms-4">* {errors.price.message}</div> : null}
            </div>
            <div className="form-row d-flex gap-5">
                <div className="form-group col">
                    <label>Product Name</label>
                    <input className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group col">
                    <label>Product Category</label>
                    <input className="form-control" value={category} onChange={e => setCategory(e.target.value)}/>
                </div>
                <div className="form-group col">
                    <label>Product Type</label>
                    <input className="form-control" value={type} onChange={e => setType(e.target.value)}/>
                </div>
            </div>
            <div className="mt-3 form-row d-flex gap-5">
                <div className="form-group col-1">
                    <label>Unit Qty</label>
                    <input type="number" className="form-control" value={unitQty} onChange={e => setUnitQty(e.target.value)}/>
                </div>
                <div className="form-group col-2">
                    <label>Units</label>
                    <input className="form-control" value={units} onChange={e => setUnits(e.target.value)}/>
                </div>
                <div className="form-group col-3">
                    <label>Container Type</label>
                    <input className="form-control" value={container} onChange={e => setContainer(e.target.value)}/>
                </div>
                <div className="form-group col-2">
                    <label>Price</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                    </div>
                </div>
                <button className="btn btn-success mt-3 w-100">Add New Item</button>
            </div>
        </form>
    )
}

export default ItemsAddForm;