import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/coursalimg1.jpg'; 
import img2 from '../../assets/coursalimg2.jpg'; 
import img3 from '../../assets/coursalimg3.jpg'; 
import img4 from '../../assets/coursalimg4.jpg'; 

const images = [img1, img2, img3,img4];
const ImageCarousel = () => {
    const settings = {
        dots: true,  
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  
        autoplaySpeed: 3000, 
        pauseOnHover: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        
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
