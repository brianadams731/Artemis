import { Trashcan } from "./svg/Trashcan";

import styles from "../styles/EditBoardModal.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEndpoint } from "../utils/apiEndpoints";
import { KeyedMutator } from "swr";
import { IWorkspace } from "../hooks/swr/useFetchWorkspace";
import { patchDataAsync } from "../utils/patchDataAsync";
import { postDataAsync } from "../utils/postDataAsync";

interface Default {
    mutateWorkspace: KeyedMutator<IWorkspace>;
    closeModal: () => void;
}

interface PropsEdit extends Default {
    state: "edit";
    id: string;
    name: string;

    workspaceId?: string;
}
interface PropsNew extends Default {
    state: "new";
    workspaceId: string;

    id?: string;
    name?: string;
}
type Props = PropsEdit | PropsNew;

const EditBoardModal = ({ state, id, name, workspaceId, closeModal, mutateWorkspace }: Props): JSX.Element => {
    const [rename, setRename] = useState<string>(state === "edit" ? name : "");
    const [canExit, setCanExit] = useState<boolean>(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.wrapper} onMouseUp={() =>
            setTimeout(() => {
                setCanExit(true)
            }, 0)
        } onClick={() => {
            canExit && closeModal();
        }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.modalWrapper} onMouseDown={() => setCanExit(false)} onClick={(e) => {
                e.stopPropagation();
            }}>
                {state === "edit" && <button className={styles.trash} onClick={async () => {
                    if (state === "edit" && name.toLowerCase() === "unassigned".toLowerCase()) {
                        return;
                    }

                    const res = await fetch(`${getEndpoint("board_by_id")}/${id}`, {
                        method: "DELETE"
                    })
                    if (res.ok) {
                        mutateWorkspace();
                        closeModal();
                    }
                }}>
                    <Trashcan />
                </button>}
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (state === "edit") {
                        if (rename === name || name.toLowerCase() === "unassigned".toLowerCase()) {
                            return;
                        }
                        const res = await patchDataAsync(`${getEndpoint("board_by_id")}/${id}`, {
                            name: rename
                        }, false);
                        if (res.ok) {
                            mutateWorkspace();
                            closeModal();
                        }
                    } else if (state === "new") {
                        if (rename === "") {
                            return;
                        }
                        const res = await postDataAsync(`${getEndpoint("board_add")}/${workspaceId}`, {
                            name: rename
                        }, false)
                        if (res.ok) {
                            mutateWorkspace();
                            closeModal();
                        }
                    }

                }}>
                    <label>{state === "edit" ? "Update Name" : "Board Name"}
                        <input type="text" value={rename} onChange={(e) => {
                            setRename(e.target.value);
                        }} />
                    </label>
                    <button type="submit">{state === "edit" ? "Update Board" : "Add Board"}</button>
                </form>
            </motion.div>
        </motion.div>
    )
}

export { EditBoardModal };