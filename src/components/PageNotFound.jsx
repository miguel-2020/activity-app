import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import {container,customLink} from "./PageNotFound.module.css"

export default function PageNotFound(){
    
    
    return (
       <div className={container}>
        <h1>
            Page could not be found
        </h1>

        <Link to="/activity-app" className={customLink}>
            Go back to home
            <FaHome/>
        </Link>
       </div>
    )
}