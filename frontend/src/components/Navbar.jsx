import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Order & Inventory Management</h2>

            <div>
                <Link to="/">Dashboard</Link>{" | "}
                <Link to="/customers">Customers</Link>{" | "}
                <Link to="/products">Products</Link>{" | "}
                <Link to="/orders">Orders</Link>{" | "}
                <Link to="/inventory">Inventory</Link>
            </div>
        </nav>
    );
}

export default Navbar;