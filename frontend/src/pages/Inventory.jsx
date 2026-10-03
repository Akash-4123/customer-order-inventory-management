import { useEffect, useState } from "react";
import API from "../services/api";

function Inventory() {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

        try {

            const response = await API.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load inventory");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>

            <h1>Inventory</h1>

            <table border="1" cellPadding="10">

                <thead>

                <tr>
                    <th>Product ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                </tr>

                </thead>

                <tbody>

                {products.map((product) => (

                    <tr key={product.id}>

                        <td>{product.id}</td>

                        <td>{product.name}</td>

                        <td>{product.category}</td>

                        <td>₹{product.price}</td>

                        <td>{product.stockQuantity}</td>

                        <td>

                            {product.stockQuantity === 0
                                ? "OUT OF STOCK"
                                : product.stockQuantity <= 10
                                    ? "LOW STOCK"
                                    : "IN STOCK"}

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Inventory;