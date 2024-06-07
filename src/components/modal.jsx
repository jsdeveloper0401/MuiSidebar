import React, { useState } from "react";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const UserModal = (props) => {
    const [form, setForm] = useState({
        name: "",
        price: "",
        year: "",
        color: "",
        brand: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        props.setCars([...props.cars, form]);
        setForm({
            name: "",
            price: "",
            year: "",
            color: "",
            brand: "",
        });
        props.toggle();
    };

    return (
        <div className="container">
            <Modal
                open={props.open}
                onClose={props.toggle}
                aria-labelledby="modal-title"
                aria-describedby="modal-description">
                <Box sx={style}>
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        className="text-center">
                        Add user
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        id="submit"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}>
                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Price"
                            name="price"
                            variant="outlined"
                            value={form.price}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
                        <TextField
                            label="Year"
                            name="year"
                            variant="outlined"
                            value={form.year}
                            onChange={handleChange}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="Color"
                            name="color"
                            variant="outlined"
                            value={form.color}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Brand"
                            name="brand"
                            variant="outlined"
                            value={form.brand}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 2,
                        }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.toggle}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            form="submit">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default UserModal;
