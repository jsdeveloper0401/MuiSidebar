import React, { useState } from "react";
import { nanoid } from "nanoid";
import UserModal from "../modal";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

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
    const [searchTerm, setSearchTerm] = useState("");

    const openModal = () => {
        setModal(true);
    };

    const deleteCar = (id) => {
        setCars(cars.filter((car) => car.id !== id));
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
                                <input
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control m-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered table-hover table-striped my-3 bg-info table-responsive">
                        <thead>
                            <tr>
                                <th>T/R</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCars.map(
                                (
                                    { id, name, brand, color, price, year },
                                    index
                                ) => (
                                    <tr className="" key={id}>
                                        <td>
                                            <span>ID</span> {index + 1}
                                        </td>
                                        <td>
                                            <span>Name</span> {name}
                                        </td>
                                        <td>
                                            <span>Brand</span> {brand}
                                        </td>
                                        <td>
                                            <span>Color</span> {color}
                                        </td>
                                        <td>
                                            <span>Price</span> {price}
                                        </td>
                                        <td>
                                            <span>Year</span> {year}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <button className="btn btn-warning">
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        deleteCar(id)
                                                    }>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
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
                                                    <i className="fa-solid fa-circle-info"></i>
                                                </NavLink>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Cars;
