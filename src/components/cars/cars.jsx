import React, { useState } from "react";
import { nanoid } from "nanoid";
import UserModal from "../modal";
import { NavLink } from "react-router-dom";
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import "./cars.css";

const Cars = () => {
    const [cars, setCars] = useState([
        {
            id: nanoid(),
            name: "BYD Song +",
            brand: "BYD",
            color: "Black",
            price: "$10000",
            year: "2020-02-02",
        },
        {
            id: nanoid(),
            name: "Mercedes CLA 5",
            brand: "Mercedes Benz",
            color: "Black",
            price: "$18000",
            year: "2023-03-02",
        },
    ]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCar, setCurrentCar] = useState(null);

    const openModal = () => {
        setModal(true);
    };

    const openEditModal = (car) => {
        setCurrentCar(car);
        setEditModal(true);
    };

    const deleteCar = (id) => {
        setCars(cars.filter((car) => car.id !== id));
    };

    const updateCar = () => {
        setCars(
            cars.map((car) => (car.id === currentCar.id ? currentCar : car))
        );
        setEditModal(false);
        setCurrentCar(null);
    };

    const filteredCars = cars.filter((car) =>
        Object.values(car).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            <UserModal
                open={modal}
                toggle={() => setModal(false)}
                cars={cars}
                setCars={setCars}
            />
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentCar?.name || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                name: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Brand"
                        type="text"
                        fullWidth
                        value={currentCar?.brand || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                brand: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        type="text"
                        fullWidth
                        value={currentCar?.color || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                color: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        fullWidth
                        value={currentCar?.price || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                price: e.target.value,
                            })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Year"
                        type="date"
                        fullWidth
                        value={currentCar?.year || ""}
                        onChange={(e) =>
                            setCurrentCar({
                                ...currentCar,
                                year: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setEditModal(false)}
                        color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={updateCar} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="row mb-3">
                            <div className="col-md-3 m-3">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={openModal}>
                                    Open modal
                                </Button>
                            </div>
                            <div className="col-md-8">
                                <TextField
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Search..."
                                    variant="outlined"
                                    fullWidth
                                    className="m-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <TableContainer
                        component={Paper}
                        className="my-3 bg-info table-responsive">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCars.map(
                                    (
                                        { id, name, brand, color, price, year },
                                        index
                                    ) => (
                                        <TableRow key={id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{brand}</TableCell>
                                            <TableCell>{color}</TableCell>
                                            <TableCell>{price}</TableCell>
                                            <TableCell>{year}</TableCell>
                                            <TableCell>
                                                <div className="d-flex gap-3">
                                                    <IconButton
                                                        color="warning"
                                                        onClick={() =>
                                                            openEditModal({
                                                                id,
                                                                name,
                                                                brand,
                                                                color,
                                                                price,
                                                                year,
                                                            })
                                                        }>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            deleteCar(id)
                                                        }>
                                                        <Delete />
                                                    </IconButton>
                                                    <NavLink
                                                        to="single-car"
                                                        state={{
                                                            car: {
                                                                id,
                                                                name,
                                                                brand,
                                                                color,
                                                                price,
                                                                year,
                                                            },
                                                        }}
                                                        className="btn btn-primary">
                                                        <Info />
                                                    </NavLink>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default Cars;
