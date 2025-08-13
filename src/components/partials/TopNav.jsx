import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';
import Axios from '../../utils/Axios'


function TopNav() {

const [query, setQuery] = useState("");
const[search, setSearch] = useState([]);
const Getsearches = async() => {
    try {
        const {data} = await Axios.get(`/search/multi?query=${query}`)
setSearch(data.results)

    } catch (error) {
        console.log(error)
    }
}




    const inputRef = useRef(null);
    const handleIconClick = () => {
    inputRef.current?.focus();
    };

useEffect(() => {
Getsearches();
},[query])

return (
    <div className='text-zinc-200 w-[80%] h-[10vh] px-[17%] pt-8 pl-55 relative flex  '>
    <form action="">
    <span className='absolute top-8.5 left-40 text-2xl text-zinc-300 cursor-pointer' onClick={handleIconClick}><GoSearch /></span>
        <input value={query} ref={inputRef} onChange={(e) => setQuery(e.target.value)} className='border-none outline-none w-50' type="text" placeholder='search anything' />
{query.length >0? <span onClick={() => setQuery("")} className='absolute text-zinc-400 top-[38px] left-137 text-lg cursor-pointer'>    <RxCross1 /></span> : ""}
    </form>
    <div className='top-18 absolute left-41 z-3 flex flex-col h-80  overflow-y-auto flex'>
{
    search.map((s, idx) => (
            <Link  key={idx} to={`/${s.media_type}/details/${s.id}`} className='bg-zinc-400 border-b-1  w-100  text-black text-start p-5 flex items-center gap-10'>
            <img className='w-[10vh] h-[10vh] object-cover rounded shadow-lg' src= { s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : "https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg"} alt="" />
            <span>{s.name || s.orignal_name || s.title ||s.orignal_title}</span>
            </Link>
    ))
}




    </div>
    
    
    </div>
)
}


export default TopNav