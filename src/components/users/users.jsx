import axios from "axios";
import React, { useEffect, useState } from "react";
import prev from "@img/prev.svg";
import next from "@img/next.svg";
import Rolling from "@img/rolling.svg";
import "./users.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
            )
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [currentPage, limit]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    if (loading) {
        return (
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                <img src={Rolling} alt="Loading..." />
            </h3>
        );
    }

    return (
        <div className="users">
            <table className="table table-bordered table-hover table-striped overflow-x-auto table-primary">
                <thead>
                    <tr>
                        <th>T/R</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td><span>Id</span>{user.id}</td>
                            <td><span>Name</span>{user.name}</td>
                            <td><span>Username</span>{user.username}</td>
                            <td><span>Email</span>{user.email}</td>
                            <td><span>Address</span>{user.address.city}</td>
                            <td><span>Street</span>{user.address.street}</td>
                            <td><span>Phone</span>{user.phone}</td>
                            <td><span>Website</span>{user.website}</td>
                            <td><span>Company</span>{user.company.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="card-footer d-flex justify-content-center pt-2">
                <button
                    onClick={handlePreviousPage}
                    className="btn btn-primary"
                    disabled={currentPage === 1}>
                    <img src={prev} alt="prev icon" />
                </button>
                <span className="btn btn-info mx-2">Page {currentPage}</span>
                <button onClick={handleNextPage} className="btn btn-primary">
                    <img src={next} alt="next icon" />
                </button>
            </div>
        </div>
    );
};

export default Users;
