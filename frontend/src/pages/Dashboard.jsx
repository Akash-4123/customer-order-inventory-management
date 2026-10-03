import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0
    });

    useEffect(() => {

        API.get("/dashboard/summary")
            .then(response => {
                setDashboard(response.data);
            })
            .catch(error => {
                console.error("Failed to load dashboard", error);
            });

    }, []);

    return (
        <div>

            <h1>Customer Order & Inventory Management</h1>

            <p>Welcome to the management dashboard.</p>

            <h2>Dashboard</h2>

            <div>

                <h3>Total Customers</h3>
                <p>{dashboard.totalCustomers}</p>

                <h3>Total Products</h3>
                <p>{dashboard.totalProducts}</p>

                <h3>Total Orders</h3>
                <p>{dashboard.totalOrders}</p>

                <h3>Total Sales</h3>
                <p>₹{dashboard.totalSales}</p>

            </div>

        </div>
    );
}

export default Dashboard;