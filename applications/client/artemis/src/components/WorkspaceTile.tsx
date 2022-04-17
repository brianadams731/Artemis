import { useNavigate } from 'react-router-dom';
import styles from '../styles/WorkspaceTile.module.scss';

interface Props{
    id: string;
    name: string;
}

const WorkspaceTile = ({id, name}:Props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper} onClick={()=>{
            navigate(`/dashboard/workspace/${id}`);
        }}>
            <h1>ID: {id}</h1>
            <h2>Name: {name}</h2>
        </div>
    )
}

export { WorkspaceTile };