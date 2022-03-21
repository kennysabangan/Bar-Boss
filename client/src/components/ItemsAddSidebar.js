import { Link } from "react-router-dom";

const ItemAddSidebar = () => {
    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <div className="mt-4 ms-2 d-flex flex-column gap-4">
            <button onClick={refreshPage} className="btn btn-danger ms-4 me-5 w-100">Clear Form</button>
            <Link to="/items" className="btn btn-secondary ms-4 me-5 w-100">Go Back</Link>
        </div>
    )}

export default ItemAddSidebar;