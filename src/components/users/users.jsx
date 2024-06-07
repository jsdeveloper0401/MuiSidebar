import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import prev from "@img/prev.svg";
import next from "@img/next.svg";
import Rolling from "@img/rolling.svg";
// import "./users.css";

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
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>T/R</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Company name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address.city}</TableCell>
                                <TableCell>{user.address.street}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.website}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
