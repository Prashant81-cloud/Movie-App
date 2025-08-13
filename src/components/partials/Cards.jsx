import React from 'react'
import { Link } from 'react-router-dom';

const Cards = ({ data, title }) => {


return (
    <div className="flex flex-wrap  bg-[#1F1E24]  justify-end ">
    {data.map((c, i) => (
        <Link 
        to={`/${c.media_type || title}/details/${c.id}`}
        className="w-[25vh] mr-[5%] mb-[5%] overflow-x-hidden " key={i}>
        <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
            c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
        />
        <h1 className="text-2xl text-zinc-300 mt-3 font-semibold flex justify-between">
            {c.name ||
            c.title ||
            c.original_name ||
            c.original_title ||
            c.profile_path}
                <div className=''>
        {c.vote_average && (
            <div className="flex  rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
        )}
        </div>
        </h1>

        </Link>
    ))}
    </div>
);
};

export default Cards;

