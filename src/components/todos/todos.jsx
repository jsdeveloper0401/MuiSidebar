import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const limit = windowWidth <= 450 ? 4 : 9;
        setLoading(true);
        axios
            .get(`https://jsonplaceholder.typicode.com/todos`, {
                params: {
                    _page: currentPage,
                    _limit: limit,
                },
            })
            .then((response) => {
                setTodos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [currentPage, windowWidth]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const deleteTodo = (id) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => {
                setTodos(todos.filter((todo) => todo.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const startEditing = (id, currentTitle) => {
        setEditingId(id);
        setEditingTitle(currentTitle);
    };

    const saveEdit = (id) => {
        axios
            .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                title: editingTitle,
                completed: todos.find((todo) => todo.id === id).completed,
            })
            .then((response) => {
                setTodos(
                    todos.map((todo) => (todo.id === id ? response.data : todo))
                );
                setEditingId(null);
                setEditingTitle("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    {editingId === item.id ? (
                                        <TextField
                                            value={editingTitle}
                                            onChange={(e) =>
                                                setEditingTitle(e.target.value)
                                            }
                                        />
                                    ) : (
                                        item.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.completed ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>
                                    {editingId === item.id ? (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => saveEdit(item.id)}>
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            className="m-2"
                                            variant="contained"
                                            color="info"
                                            onClick={() =>
                                                startEditing(
                                                    item.id,
                                                    item.title
                                                )
                                            }>
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        className="m-2"
                                        variant="contained"
                                        color="error"
                                        onClick={() => deleteTodo(item.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                    className="m-2"
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}>
                    <NavigateBeforeIcon />
                </Button>
                <Typography variant="button">Page {currentPage}</Typography>
                <Button
                    className="m-2"
                    variant="contained"
                    color="primary"
                    onClick={handleNextPage}>
                    <NavigateNextIcon />
                </Button>
            </div>
        </div>
    );
};

export default Todos;
