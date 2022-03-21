import { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryList = () => {

    const [ fullInventory, setFullInventory ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/locations')
            .then(res => {
                const data = res.data;
                var concatInventories = []

                data.map((area, idx) => {
                    for (let i = 0; i < area.inventory.length; i++) {
                        if (isProductUnique(concatInventories, area.inventory[i])) {
                            concatInventories.push(area.inventory[i]);
                        } else {
                            findProductAddQuantity(concatInventories, area.inventory[i]);
                        }
                    }
                })

                setFullInventory([...concatInventories])
            })
            .catch(err => console.log(err))
    }, [])

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
        <table className="table table-bordered border-dark mx-5 mt-4 text-center align-middle" style={{ border: "3px solid black" }}>
        <thead>
            <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
            </tr>
        </thead>
        <tbody>
            { fullInventory.map((item, idx) => (
                <tr>
                    <td>{item.product.name}</td>
                    <td>{item.product.category}</td>
                    <td>{item.product.type}</td>
                    <td>{item.product.unitQty}{item.product.units} {item.product.container}</td>
                    <td>{item.quantity}</td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}

export default InventoryList;