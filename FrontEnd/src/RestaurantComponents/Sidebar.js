import "../styles/Sidebar.css";
import { AiFillHome } from "react-icons/ai"
import {BiFoodMenu} from "react-icons/bi"
import {AiOutlineInfoCircle} from "react-icons/ai"
import {MdCall} from "react-icons/md"

const Sidebar = ({show}) => {

    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <div className="list">
            <ul>
                <li><a href="/restaurant"><AiFillHome /> Home</a></li>
                <li><a href="/restaurant/menu"><BiFoodMenu /> Menu</a></li>
                <li><a href="/restaurant/about"><AiOutlineInfoCircle /> About</a></li>
                <li><a href="/restaurant/contact"><MdCall /> Contact</a></li>
            </ul>
            </div>

        </div>

    )
}

export default Sidebar