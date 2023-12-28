import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import slugGenerator from "../slugGenerator.js";

export default function NavLink({to,path}){
    return (
    <Link to={`/activity-app/${slugGenerator(to)}`}>
       {path == to ? <MdOutlineKeyboardDoubleArrowRight /> : ''} {to}      
    </Link>
    )
}