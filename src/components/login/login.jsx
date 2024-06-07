import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnackbarWithDecorators from "../../components/notification";
import "./login.css";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = form;
        if (username === "admin" && password === "123") {
            setOpen(true);
            setType("success");
            setErrorMessage("You are logged in");
            setTimeout(() => {
                navigate("/main/cars");
            }, 1000);
        } else {
            setOpen(true);
            setType("danger");
            setErrorMessage("Invalid username or password");
        }
        setForm({ username: "", password: "" });
    };

    return (
        <section className="Login">
            <div className="container">
                <SnackbarWithDecorators
                    open={open}
                    setOpen={setOpen}
                    type={type}
                    errorMessage={errorMessage}
                />
                <div className="row">
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="card card1">
                            <div className="card-header">
                                <h1 className="text-center">Tizimga kirish</h1>
                            </div>
                            <div className="card-body">
                                <TextField
                                    fullWidth
                                    onChange={handleChange}
                                    label="Username"
                                    name="username"
                                    type="text"
                                    id="username"
                                    className="form-control my-2"
                                    value={form.username}
                                />
                                <TextField
                                    fullWidth
                                    onChange={handleChange}
                                    label="Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control my-2"
                                    value={form.password}
                                />
                            </div>
                            <div className="card-footer">
                                <Button
                                    variant="contained"
                                    form="form"
                                    type="submit">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
