import { useNavigate } from 'react-router-dom';
import { IWorkspaceTile } from '../interfaces/IWorkspaceTile';
import styles from '../styles/WorkspaceTile.module.scss';

interface Props{ 
    id: string;
    name: string;
    userOwns: boolean;
    editModal: (workspace: IWorkspaceTile)=>void;
}

const WorkspaceTile = ({id, name, userOwns, editModal}:Props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper} onClick={()=>{
            navigate(`/dashboard/workspace/${id}`);
        }}>
            <h3>{name}</h3>
            {userOwns && <button onClick={(e)=>{ //edit button here
                e.stopPropagation();
                editModal({name, id});
            }}>Edit</button>}
        </div>
    )
}

export { WorkspaceTile };