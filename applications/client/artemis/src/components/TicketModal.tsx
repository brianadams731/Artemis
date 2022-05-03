import { motion } from "framer-motion";
import produce from "immer";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { KeyedMutator } from "swr";
import { IWorkspace } from "../hooks/swr/useFetchWorkspace";
import styles from "../styles/TicketModal.module.scss";
import { getEndpoint } from "../utils/apiEndpoints";
import { patchDataAsync } from "../utils/patchDataAsync";
import { postDataAsync } from "../utils/postDataAsync";
import { Trashcan } from "./svg/Trashcan";

interface EditProps {
    state: "edit"
    id: string;
    boardId: string;
    description: string;
    comment: string;
    priority: number;
    closeModal: () => void;
    mutateWorkspace: KeyedMutator<IWorkspace>;
}

interface NewProps {
    state: "new"
    boardId: string;
    closeModal: () => void;
    mutateWorkspace: KeyedMutator<IWorkspace>;

    id?: string;
    comment?: string;
    description?: string;
    priority?:number;
}

type Props = NewProps | EditProps;

const TicketModal = ({ id, state, boardId, comment, priority, description, closeModal, mutateWorkspace }: Props): JSX.Element => {

    const [ticketDescription, setTicketDescription] = useState<string>(description ? description : "");
    const [ticketComment, setTicketComment] = useState<string>(comment ? comment : "");
    const [ticketPriority, setTicketPriority] = useState<number>(priority? priority : 0);
    const [canExit, setCanExit] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        mutateWorkspace();
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    return ReactDOM.createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.wrapper} onClick={() => { canExit&& closeModal() }} onMouseUp={()=>{
            setTimeout(()=>{
                setCanExit(true);
            },0)
        }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.modalWrapper} onMouseDown={()=>setCanExit(false)} onClick={(e) => { 
                e.stopPropagation();
            }}>
                <button className={styles.trash} onClick={async () => {
                    mutateWorkspace(
                        produce<IWorkspace>(draft => {
                            const sourceBoard = draft.boards.find((item) => item.id === boardId);
                            const ticketIndex = sourceBoard?.tickets.findIndex((item) => item.id === id);
                            if (ticketIndex !== -1) {
                                sourceBoard?.tickets.splice(ticketIndex!, 1);
                            }
                        })
                        , false)
                    await fetch(`${getEndpoint("ticket_by_id")}/${id}`, {
                        method: "DELETE"
                    });
                    mutateWorkspace();
                    closeModal();
                }}>
                    <Trashcan />
                </button>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (state === "new") {
                        mutateWorkspace(
                            produce<IWorkspace>(draft => {
                                const sourceBoard = draft.boards.find((item) => item.id === boardId);
                                sourceBoard?.tickets.push({
                                    id: `ticket${Math.floor(Math.random() * 999999999)}`,
                                    description: ticketDescription,
                                    comment: ticketComment,
                                    priority: ticketPriority
                                })
                            })
                            , false)
                        await postDataAsync(`${getEndpoint("add_ticket_by_boardId")}/${boardId}`, {
                            description: ticketDescription,
                            comment: ticketComment,
                            priority: ticketPriority
                        }, false)
                        mutateWorkspace();
                    } else {
                        mutateWorkspace(
                            produce<IWorkspace>(draft => {
                                const sourceBoard = draft.boards.find((item) => item.id === boardId);
                                const sourceTicket = sourceBoard?.tickets?.find((item) => item.id === id);
                                sourceTicket!.description = ticketDescription;
                                sourceTicket!.comment = ticketComment;
                                sourceTicket!.priority = ticketPriority;
                            })
                            , false)

                            console.log(ticketPriority);
                            
                        await patchDataAsync(`${getEndpoint("ticket_by_id")}/${id}`, {
                            ticketComment: ticketComment,
                            ticketDescription: ticketDescription,
                            ticketPriority: ticketPriority
                        }, false)
                    }
                    // TODO: Uncomment out to sync workspace back up with server
                    //await mutateWorkspace();
                    closeModal();
                }}>
                    <label>
                        Title
                        <input className={styles.title} type="text" value={ticketDescription} data-testid="title" onChange={(e) => {
                            setTicketDescription(e.target.value);
                        }} />
                    </label>
                    <label>
                        Description
                        <textarea className={styles.description} value={ticketComment} style={{ resize: 'none' }} data-testid="description" onChange={(e) => {
                            setTicketComment(e.target.value);
                        }} />
                    </label>

                    <div className={styles.radioWrapper} onClick={(e)=>e.preventDefault()}>
                        <button style={ticketPriority === 2?{border: "3px solid var(--c-main-gray)"}:{}}className={styles.red} onClick={()=> setTicketPriority(2)}></button>
                        <button style={ticketPriority === 1?{border: "3px solid var(--c-main-gray)"}:{}}className={styles.yellow} onClick={()=> setTicketPriority(1)}></button>
                        <button style={ticketPriority === 0?{border: "3px solid var(--c-main-gray)"}:{}}className={styles.blue} onClick={()=> setTicketPriority(0)}></button>
                    </div>

                    <button type="submit">{id ? "Update" : "Create"}</button>
                </form>
            </motion.div>
        </motion.div>
        , document.querySelector("#portal1")!
    )
}

export { TicketModal };
