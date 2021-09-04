import React, {useContext, useState} from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import '../styles/ImageSlider.css'
import {MouseContext} from "../context/mouse-context";
const ImageSlider = ({ slides }) => {
    const { cursorChangeHandler } = useContext(MouseContext);

    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }
    return (
        <section className='slider'>

            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <img  src={slide.image} alt="" className='image' />
                        )}
                    </div>
                );
            })}
            <FaArrowAltCircleLeft className='left-arrow' color="#037fff" opacity={0.7} onClick={prevSlide} onMouseEnter={() => cursorChangeHandler("hovered")}
                                  onMouseLeave={() => cursorChangeHandler("")}/>
            <FaArrowAltCircleRight className='right-arrow' color="#037fff" opacity={0.7}  onClick={nextSlide} onMouseEnter={() => cursorChangeHandler("hovered")}
                                   onMouseLeave={() => cursorChangeHandler("")}/>
        </section>
    );
};

export default ImageSlider;