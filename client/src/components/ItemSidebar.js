import { Link } from "react-router-dom";

const ItemSidebar = () => {
    return (
        <div className="sidebar mt-4 ms-2 d-flex flex-column gap-4">
            <Link to="/items/add" className="btn btn-success ms-4 w-100">Add Items</Link>
            <Link to="/items/edit" className="btn btn-primary ms-4 w-100">Edit Items</Link>
        </div>
    )}

export default ItemSidebar;