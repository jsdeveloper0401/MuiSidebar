import React from "react";
import { useLocation } from "react-router-dom";
const SingleCar = () => {
    const location = useLocation();
    const { car } = location.state;

    return (
        <div className="card d-grid col-sm-12 bg-info text-white col-md-6 col-lg-4 mx-auto p-4">
            <h1>Car Details</h1>
            <h3>Name: {car.name}</h3>
            <h5>Brand: {car.brand}</h5>
            <p>Color: {car.color}</p>
            <p>Price: {car.price}</p>
            <p>Year: {car.year}</p>
        </div>
    );
};

export default SingleCar;
