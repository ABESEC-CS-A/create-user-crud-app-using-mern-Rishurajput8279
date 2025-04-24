import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewUser() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "student"
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get("https://userapp6.onrender.com/users");
            setUsers(response.data);
        } catch (err) {
            console.log("Data fetching error:", err.message);
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://userapp6.onrender.com/adduser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("User created: ", data);
            setFormData({ name: "", email: "", role: "student" }); 
            fetchUser(); 
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    };

  
    const handleDelete = async(email) => {
        try{
        const response = await fetch(`https://userapp6.onrender.com/removeuser/${email}`, {
            method: "DELETE",
        });

        console.log(`deleted successfully`);
    }
    catch(error) {
        console.error("there is an error:", error.message);
    }

    }

    
    return (
        <div>
            <h3 >User List</h3>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter user name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter user email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <select
                                    name="role"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Add User
                                </button>
                            </td>
                        </tr>
                        {users.map((user, index) => (
                            <tr key={user.email}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    
                                    <button className="btn btn-warning" >Edit</button>-
                                    <button className="btn btn-success" onClick={() => { handleDelete(user.email)}}>Delete</button>    
                                </td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
            )}
        </div>
    );
}

export default ViewUser;
