import React from "react";
import BlueCar from "../../assets/img/blue-car.png";

const Index = () => {
    return (
        <div className="container">
            <h1 className="text-center text-white">Model X</h1>
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={BlueCar}
                            className="d-block slider__img"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={BlueCar}
                            className="d-block slider__img"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={BlueCar}
                            className="d-block slider__img"
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Index;
