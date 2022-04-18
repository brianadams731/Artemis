import '../styles/Home.scss';
import { Link } from 'react-router-dom';
const Home = (): JSX.Element => {

    return (
        <div className="sandbox">
            <nav className="navbar">
                <div className="artemis">ARTEMIS</div>
                <ul className="nav-links">
                    <div className="menu">
                        <li><button className="button getstarted" ><Link to="/register">Get Started with Artemis</Link></button></li>
                        <li><button className="button login"><Link to="/login">Login</Link></button></li>
                        <li><div className="button space"></div></li>
                    </div>
                </ul>
            </nav>
            <div className="col-1">
                <div className="button space"></div>
                <div className="button space"></div>
            </div>
            <div className="col-1">
                <div className="button space"></div>
                <div className="button space"></div>
            </div>
            <div className="col-2">
                <div className="pursue">Pursue Perfection.</div>
                <div className="art_makes">Artemis makes it easy to track bugs and manage
                    projects with an elegant, efficient design in order to boost productivity
                    for all of our customers teams</div>
                <div className="indent_learn"><button className="button learn"><a href="http://about.thoughtgrove.com">Learn More</a></button></div>
            </div>
            <div className="col-3"></div>
            <div className="col-12 grid-container">
                <div className="grid-item item6">
                    <div className="manage_image"><img src='assets/management.png' width="30" height="30" /></div>
                    <div className="manage">mangage tickets</div>
                    <div className="manage_descrip">Users will have the ability to modify tickets in their projects.
                        They can easily add tickets, mark tickets as completed, mark tickets as in progress along
                        with many more features.</div>
                </div>
                <div className="grid-item item7">
                    <div className="store_image"><img src="assets/Change.png" width="30" height="30" /></div>
                    <div className="store">store changes</div>
                    <div className="store_descrip">With a built in changelog, your team will easily be able to track the
                        changes that have been made to all of your projects that are currently being worked on.</div>
                </div>
                <div className="grid-item item8">
                    <div className="security_image"><img src="assets/Vector.png" width="30" height="30" /></div>
                    <div className="security">security</div>
                    <div className="security_descrip">At Artemis, we value safety and security first and foremost, and we
                        understand how important it is to protect the data of your projects, employees, and customers.
                        All of your data is secured using Bcrypt, UUID’s and safe browsing with HTTPS. &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>
            </div>
    </div>
    )

}

export { Home };