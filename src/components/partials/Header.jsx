import React from 'react';
import { Link } from 'react-router-dom';
import { HiSpeakerphone } from "react-icons/hi";
import { FaTape, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// Custom Left Arrow
function PrevArrow({ onClick }) {
    return (
        <button
        onClick={onClick}
        className="absolute top-1/2 scale-150 -translate-y-1/2 left-5 z-10 text-white text-2xl  p-2 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
        <IoIosArrowBack />
        </button>
    );
}

// Custom Right Arrow
function NextArrow({ onClick }) {
    return (
        <button
        onClick={onClick}
        className="absolute top-1/2 scale-150 -translate-y-1/2 right-5 z-10 text-white text-2xl  p-2 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
<IoIosArrowForward />
        </button>
    );
}

function Header({ data }) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };
        console.log(data[0].id);
    return (

<div className="h-[48vh] w-full overflow-hidden relative group">
    <Slider {...settings} className="h-full">
    {data.map((val, index) => {
    const imagePath = val.backdrop_path || val.poster_path || val.profile_path || "";
    const imageURL = `https://image.tmdb.org/t/p/original/${imagePath}`;

    return (
    <div key={index}>
        <div
        className="w-full flex flex-col gap-3 pt-40 pl-[72px] text-white items-start !h-[48vh]"
        style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)), url(${imageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
        }}>
    <h1 className="font-black text-4xl">{val.original_title || val.original_name}</h1>
    <p className="w-[70%]">
    {val.overview?.slice(0, 170)}
    <Link to={`movie/details/${val.id}`} className="text-blue-400">...more</Link>
    </p>
    <div className="flex text-yellow-500 items-center uppercase">
    <span><HiSpeakerphone /></span>
    <p className="text-white ml-2 text-sm">{val.release_date || "No Info"}</p>
    <span className="ml-7"><FaTape /></span>
    <p className="text-white ml-2 text-sm">Movie</p>
    </div>
    <Link to={`/movie/details/${val.id}/trailer`} className="bg-[#6556CD] p-3 rounded hover:bg-[#4B3FA1]">Watch Trailer</Link>
    </div>
    </div>
    );
})}
    </Slider>
</div>
    );
}

export default Header;
