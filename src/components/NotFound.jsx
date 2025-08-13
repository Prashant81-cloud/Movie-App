import loader from "/loader.gif";
import not from "/404.gif";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiCrossMark } from "react-icons/gi";

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <img className="h-[50%] object-cover" src={not} alt="" />
                <Link
                onClick={() => navigate(-1)}
                className="absolute z-[1000] hover:text-[#6556CD] text-3xl text-white right-[5%] top-[3%] text-white"
            ><GiCrossMark /></Link>
        </div>
    );
};

export default NotFound;