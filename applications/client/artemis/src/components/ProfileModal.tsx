import { useNavigate } from 'react-router-dom';
import { IProfile } from '../interfaces/IProfile';
import styles from '../styles/WorkspaceTile.module.scss';

interface Base{
    closeModal: ()=>void;
}

interface Props extends Base{ 
    // id: string;
    state: "open"
    // username: string;
    // email: string;
    // organization: string;
    // profile: (profile: IProfile)=>void;
}

const ProfileModal = ({closeModal}:Props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper} onClick={()=>{
            navigate("/dashboard/workspace/");
        }}>
            <h3>Username</h3>
            <h3>Email</h3>
            <h3>Organization</h3>
        </div>
    )
}

export { ProfileModal };