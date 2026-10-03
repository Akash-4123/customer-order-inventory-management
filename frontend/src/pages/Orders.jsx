import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>

            <h1>Orders</h1>

            <table border="1" cellPadding="10">

                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Items</th>
                </tr>
                </thead>

                <tbody>

                {orders.map((order) => (

                    <tr key={order.id}>

                        <td>{order.id}</td>

                        <td>
                            {order.customer?.name}
                        </td>

                        <td>
                            {order.orderDate}
                        </td>

                        <td>
                            ₹{order.totalAmount}
                        </td>

                        <td>
                            {order.status}
                        </td>

                        <td>
                            {order.items?.map((item) => (
                                <div key={item.id}>
                                    {item.product?.name}
                                    {" × "}
                                    {item.quantity}
                                </div>
                            ))}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Orders;