import React from 'react'
import { RiTvFill } from "react-icons/ri";
import { AiFillFire } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { PiFilmReelFill } from "react-icons/pi";
import { IoTvSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

function SideNav() {
return (
    <div className='w-[20%] h-screen border-r-2 text-zinc-400 py-10 px-10 flex flex-col'>
        <div className='flex items-center gap-[0.5vw]'>
        <span className='text-[#6556CD] text-xl'><RiTvFill /></span>
        <h1 className='font-bold text-xl text-zinc-200'>Movie App</h1>
        </div>
        <h1 className='text-zinc-200 font-bold my-5'>New Feeds</h1>
        <div className='ml-3' >
<Link to='/trending' className='flex my-5 items-center gap-[0.5vw] hover:text-zinc-100 w-30 transition-all duration-200 '>
<span className='text-xl'><AiFillFire /></span>
<h1 >Trending</h1>
</Link>
<Link to='/popular' className='flex my-10 items-center gap-[0.5vw] hover:text-zinc-100 transition-all duration-200'>
<span className='text-xl'> <BsStars /></span>
<h1>Popular</h1>
</Link>
<Link to='/movies' className='flex my-10 items-center gap-[0.5vw] hover:text-zinc-100 transition-all duration-200'>
<span className='text-xl'><PiFilmReelFill /></span>
<h1>Movies</h1>
</Link>
<Link to='/tvshows' className='flex my-10 items-center gap-[0.5vw] hover:text-zinc-100 transition-all duration-200'>
<span className='text-xl'><IoTvSharp /></span>
<h1>Tv Shows</h1>
</Link>
<Link to='/people' className='flex my-10 items-center gap-[0.5vw] hover:text-zinc-100 transition-all duration-200'>
<span className='text-2xl'><IoIosPeople /></span>
<h1>People</h1>
</Link>
</div>

<hr className='text-zinc-200' />

<h1 className='text-zinc-200 font-bold my-8'>Website Information</h1>
<div className='flex flex-col ml-3'>

<Link className='flex items-center gap-[1vw] text-center my-4 hover:text-zinc-100 transition-all duration-200'>
<IoIosInformationCircle />
About Us
</Link>
<Link className='flex items-center gap-[1vw] text-center my-4 hover:text-zinc-100 transition-all duration-200'>
<FaPhoneAlt />
Contact Us
</Link>
</div>
    </div>
)
}

export default SideNav