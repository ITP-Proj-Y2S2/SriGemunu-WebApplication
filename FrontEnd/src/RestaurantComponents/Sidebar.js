import "../styles/Sidebar.css";

const Sidebar = ({show}) => {

    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <div className="list">
            <ul>
                <li><a href="/restaurant">Home</a></li>
                <li><a href="/restaurant/cusretr">Menu</a></li>
                <li><a href="/restaurant/about">About</a></li>
                <li><a href="/restaurant/contact">Contact</a></li>
            </ul>
            </div>

        </div>

    )

}

export default Sidebar