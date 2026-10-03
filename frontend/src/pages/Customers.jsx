import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await API.get("/customers");
            setCustomers(response.data);
        } catch (error) {
            console.log(error);
            alert("Failed to load customers");
        }
    };

    const saveCustomer = async (e) => {
        e.preventDefault();

        try {
            if (editingId === null) {
                await API.post("/customers", {
                    name,
                    email,
                    phone,
                    address
                });
            } else {
                await API.put(`/customers/${editingId}`, {
                    name,
                    email,
                    phone,
                    address
                });
            }

            clearForm();
            fetchCustomers();

        } catch (error) {
            console.log(error);
            alert(JSON.stringify(error.response?.data || error.message));
        }
    };

    const editCustomer = (customer) => {
        setEditingId(customer.id);
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone || "");
        setAddress(customer.address || "");
    };

    const deleteCustomer = async (id) => {
        try {
            await API.delete(`/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.log(error);
            alert("Failed to delete customer");
        }
    };

    const clearForm = () => {
        setEditingId(null);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
    };

    return (
        <div>
            <h1>Customers</h1>

            <form onSubmit={saveCustomer}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button type="submit">
                    {editingId === null ? "Add Customer" : "Update Customer"}
                </button>

                {editingId !== null && (
                    <button type="button" onClick={clearForm}>
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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button onClick={() => editCustomer(customer)}>
                                Edit
                            </button>{" "}

                            <button onClick={() => deleteCustomer(customer.id)}>
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

export default Customers;