
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/DashboardHeader.module.scss";
import { getEndpoint } from "../utils/apiEndpoints";

const DashboardHeader = (): JSX.Element => {
    //const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    return (
        <header className={styles.wrapper}>
            <div className={styles.logoBox}>
                <img className={styles.logo} src="/assets/artemis.svg" alt="Artemis"/>
            </div>


            {/*<div className={styles.searchBox}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log(search)
                }}>
                    <input type="text" placeholder="search" value={search} onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "100%" }} viewBox="0 0 512 512">
                            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                        </svg>
                    </button>
                </form>
                </div>*/}
            <div className={styles.navatar}>
                <nav className={styles.navBox}>
                    <ul>
                        <Link to="/">boards</Link>
                        <Link to="/dashboard/select">workspace</Link>
                        <a href="http://about.thoughtgrove.com">about</a>
                    </ul>
                </nav>

                <div className={styles.avatar} onClick={async ()=>{
                    const res = await fetch(getEndpoint("logout")!);
                    if (!res.ok) {
                        console.log("Error");
                    }else{
                        navigate("/");
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: "100%" }}>
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                    </svg>
                </div>
                </div>   
        </header>
    )
}

export { DashboardHeader };