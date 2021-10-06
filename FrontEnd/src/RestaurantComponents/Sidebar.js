import "../styles/Sidebar.css";
import { AiFillHome } from "react-icons/ai"

const Sidebar = ({show}) => {

    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <div className="list">
            <ul>
                <li><a href="/restaurant"><AiFillHome /> Home</a></li>
                <li><a href="/restaurant/menu">Menu</a></li>
                <li><a href="/restaurant/about">About</a></li>
                <li><a href="/restaurant/contact">Contact</a></li>
            </ul>
            </div>

        </div>

    )
}

export default Sidebar