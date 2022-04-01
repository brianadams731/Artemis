import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { KeyedMutator } from "swr";
import { IWorkspace } from "../hooks/swr/useFetchWorkspace";
import styles from "../styles/TicketModal.module.scss";

interface Props {
    id?: string;
    boardId?: string;
    title?: string;
    description?: string;
    closeModal: () => void;
    mutateWorkspace: KeyedMutator<IWorkspace>;
}

const TicketModal = ({ id, title, description, closeModal, mutateWorkspace }: Props): JSX.Element => {

    const [ticketTitle, setTicketTitle] = useState<string>(title?title:"");
    const [ticketDescription, setTicketDescription] = useState<string>(description?description:"");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    return ReactDOM.createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.wrapper} onClick={() => { closeModal(); }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.modalWrapper} onClick={(e) => { e.stopPropagation() }}>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (id) {
                        // update existing ticket
                    } else {
                        // create new ticket
                    }
                    await mutateWorkspace();
                    closeModal();
                }}>
                    <label>
                        Title
                        <input className={styles.title} type="text" value={ticketTitle} onChange={(e) => {
                            setTicketTitle(e.target.value);
                        }} />
                    </label>
                    <label>
                        Description
                        <textarea className={styles.description} value={ticketDescription} style={{ resize: 'none' }} onChange={(e) => {
                            setTicketDescription(e.target.value);
                        }} />
                    </label>

                    <button type="submit">{id ? "Update" : "Create"}</button>
                </form>
            </motion.div>
        </motion.div>
        , document.querySelector("#portal1")!
    )
}

export { TicketModal };
