import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {

            const response = await API.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load products");
        }
    };

    const saveProduct = async (e) => {

        e.preventDefault();

        try {

            const productData = {
                name,
                description,
                price: Number(price),
                stockQuantity: Number(stockQuantity),
                category
            };

            if (editingId === null) {

                await API.post("/products", productData);

            } else {

                await API.put(
                    `/products/${editingId}`,
                    productData
                );
            }

            clearForm();

            fetchProducts();

        } catch (error) {

            console.log(error);

            alert(
                JSON.stringify(
                    error.response?.data || error.message
                )
            );
        }
    };

    const editProduct = (product) => {

        setEditingId(product.id);

        setName(product.name);

        setDescription(product.description || "");

        setPrice(product.price);

        setStockQuantity(product.stockQuantity);

        setCategory(product.category);
    };

    const deleteProduct = async (id) => {

        try {

            await API.delete(`/products/${id}`);

            fetchProducts();

        } catch (error) {

            console.log(error);

            alert("Failed to delete product");
        }
    };

    const clearForm = () => {

        setEditingId(null);

        setName("");
        setDescription("");
        setPrice("");
        setStockQuantity("");
        setCategory("");
    };

    return (
        <div>

            <h1>Products</h1>

            <form onSubmit={saveProduct}>

                <input
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={stockQuantity}
                    onChange={(e) =>
                        setStockQuantity(e.target.value)
                    }
                />

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <button type="submit">

                    {editingId === null
                        ? "Add Product"
                        : "Update Product"}

                </button>

                {editingId !== null && (

                    <button
                        type="button"
                        onClick={clearForm}
                    >
                        Cancel
                    </button>

                )}

            </form>

            <br />

            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {products.map((product) => (

                    <tr key={product.id}>

                        <td>{product.id}</td>

                        <td>{product.name}</td>

                        <td>{product.description}</td>

                        <td>₹{product.price}</td>

                        <td>{product.stockQuantity}</td>

                        <td>{product.category}</td>

                        <td>

                            <button
                                onClick={() =>
                                    editProduct(product)
                                }
                            >
                                Edit
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    deleteProduct(product.id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Products;