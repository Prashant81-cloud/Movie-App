import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiCrossMark } from "react-icons/gi";
import NotFound from "../NotFound";


const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    ytvideo && ytvideo.name && (document.title = "Movie App | " + ytvideo.name);

    return (
        <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <Link
                onClick={() => navigate(-1)}
                className="absolute z-[1000] hover:text-[#6556CD] text-3xl text-white right-[5%] top-[3%] text-white"
            ><GiCrossMark /></Link>
            {ytvideo ? (
                <ReactPlayer
    controls
    height={800}
    width={1500}
    playing
    muted // Add this prop to allow autoplay
    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
/>
            ) : (
                <NotFound/>
            )}
        </div>
    );
};

export default Trailer;