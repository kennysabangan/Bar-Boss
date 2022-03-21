import { Link } from "react-router-dom";

const ItemsEditSidebar = () => {

    return (
        <div className="mt-4 ms-2 d-flex flex-column gap-4">
            <Link to="/items" className="btn btn-secondary ms-4 w-100">Go Back</Link>
        </div>
    )}

export default ItemsEditSidebar;