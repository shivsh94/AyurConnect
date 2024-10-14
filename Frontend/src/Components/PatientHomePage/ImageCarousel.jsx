import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/coursalimg1.jpg'; // Make sure this path is correct
import img2 from '../../assets/coursalimg2.jpg'; // Make sure this path is correct
import img3 from '../../assets/coursalimg3.jpg'; // Make sure this path is correct
import img4 from '../../assets/coursalimg4.jpg'; // Make sure this path is correct

const images = [img1, img2, img3,img4];
const ImageCarousel = () => {
    const settings = {
        dots: true,  
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  
        autoplaySpeed: 3000, 
        pauseOnHover: true, 
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[500px] object-cover rounded-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
