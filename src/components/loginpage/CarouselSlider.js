import React, { useEffect, useState } from "react";
import Template1 from "./images/cover-Proses-Manajemen-Inventory-dan-Metode-Penerapannya-01-1-1024x656.png";
import Template2 from "./images/header-4-1-2048x1107.png";
import Template3 from "./images/projecticon.png";
import styled from "styled-components";
import BgImg from "./images/new-b-bg.png"
import LoginTempSlider from "./LoginTempSlider";

export const LeftContent = styled.div`
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
    background-image: url(${BgImg});

`
export const ThreeDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;
    margin-top: 8px;
    position: absolute;
    left: 47%;
    bottom: 15%;

    @media screen and (max-width: 767px) {
        left: 45%;
        bottom: 10%;
    }

`
export const Dots = styled.div`
    width: 11px;
    height: 11px;
    border-radius: 50px;
    background-color: #cbcbcb;
    cursor: pointer;
    border: 1px solid #ccc;
`

const getImage = (index) => {
    switch (index) {
        case 0:
            return Template1;

        case 1:
            return Template2;

        case 2:
            return Template3;
    }
}

const contentSelector = (index) => {
    let obj = {};
    switch (index) {
        case 0:
            obj = {
                heading: "Inventory Management",
                description: "Take control of your inventory with Atomwalk Office"
            }
            break;

        case 1:
            obj = {
                heading: "Customer Management",
                description: "Deliver exceptional customer service and boost sales with Atomwalk Office"
            }
            break;

        case 2:
            obj = {
                heading: "Project Management",
                description: "Make informed decisions based on real-time information and analytics provided by Atomwalk Office"
            }
            break;
    }

    return obj;
}

const CarouselSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    // const [heading, setHeading] = useState(contentSelector(0).heading);
    // const [description, setDescription] = useState(contentSelector(0).description);

    const updateSlide = (index) => {
        setCurrentSlide(index);
        // const heading = contentSelector(index).heading;
        // const description = contentSelector(index).description;
        // setHeading(heading);
        // setDescription(description);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide > 2) {
                nextSlide = 0;
            }

            updateSlide(nextSlide);
        }, 4000)

        return () => clearInterval(interval);
    })
    return (
        <LeftContent>
            {/* <LoginHeader></LoginHeader> */}
            {currentSlide == 0 && <LoginTempSlider
                Temp={getImage(0)}
                title={contentSelector(0).heading}
                desc={contentSelector(0).description}
            ></LoginTempSlider>}

            {currentSlide == 1 && <LoginTempSlider
                Temp={getImage(1)}
                title={contentSelector(1).heading}
                desc={contentSelector(1).description}
            ></LoginTempSlider>}

            {currentSlide == 2 && <LoginTempSlider
                Temp={getImage(2)}
                title={contentSelector(2).heading}
                desc={contentSelector(2).description}
            ></LoginTempSlider>}

            <ThreeDots>
                <Dots
                    onClick={() => { updateSlide(0) }}
                    style={currentSlide == 0 ? { backgroundColor: "#FF7624" } : {}}
                />
                <Dots
                    onClick={() => { updateSlide(1) }}
                    style={currentSlide == 1 ? { backgroundColor: "#FF7624" } : {}}
                />
                <Dots
                    onClick={() => { updateSlide(2) }}
                    style={currentSlide == 2 ? { backgroundColor: "#FF7624" } : {}}
                />
            </ThreeDots>
        </LeftContent>
    )
}

export default CarouselSlider;