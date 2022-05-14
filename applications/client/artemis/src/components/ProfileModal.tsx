import styles from "../styles/ProfileModal.module.scss";

interface Props {
    closeModal: () => void;
}

const ProfileModal = ({ closeModal }: Props): JSX.Element => {
    return (
        <div className={styles.wrapper} onClick={()=>{
            closeModal();
        }}>
            <div className={styles.modalWrapper} onClick={(e)=>{
                e.stopPropagation();
            }}>
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Organization</h3>
            </div>
        </div>
    )
}

export { ProfileModal };