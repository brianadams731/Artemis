import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/swr/useProfile";
import styles from "../styles/ProfileModal.module.scss";
import { getEndpoint } from "../utils/apiEndpoints";

interface Props {
    closeModal: () => void;
}

const ProfileModal = ({ closeModal }: Props): JSX.Element => {
    const { profileData, isProfileLoading, profileHasError } = useProfile();
    const navigate = useNavigate();

    if (isProfileLoading) {
        return (
            <div className={styles.wrapper} style={{}}>
                Loading...
            </div>
        )
    }
    if (profileHasError) {
        return (
            <div>
                Error
            </div>
        )
    }

    return (
        <div className={styles.wrapper} onClick={() => {
            closeModal();
        }}>
            <div className={styles.modalWrapper} onClick={(e) => {
                e.stopPropagation();
            }}>
                <h3>{`Username: ${profileData.username}`}</h3>
                <h3>{`Email: ${profileData.email}`}</h3>
                <button onClick={async () => {
                    const res = await fetch(getEndpoint("logout")!);
                    if (!res.ok) {
                        console.log("Error");
                    } else {
                        navigate("/");
                    }
                }}>Log Out</button>
            </div>
        </div>
    )
}

export { ProfileModal };