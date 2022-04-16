import { Trashcan } from "./svg/Trashcan";

import styles from "../styles/EditBoardModal.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEndpoint } from "../utils/apiEndpoints";
import { KeyedMutator, mutate } from "swr";
import { IWorkspace } from "../hooks/swr/useFetchWorkspace";
import { patchDataAsync } from "../utils/patchDataAsync";

interface Props {
    id: string;
    name: string;
    mutateWorkspace: KeyedMutator<IWorkspace>;
    closeModal: () => void;
}

const EditBoardModal = ({ id, name, closeModal, mutateWorkspace }: Props): JSX.Element => {
    const [rename, setRename] = useState<string>(name);
    const [canExit, setCanExit] = useState<boolean>(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [])

    return (
        <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.wrapper} onMouseUp={()=>
            setTimeout(()=>{
                setCanExit(true)
            },0) 
        } onClick={() => {
            canExit&& closeModal();
        }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.modalWrapper} onMouseDown={()=>setCanExit(false)} onClick={(e) => {
                e.stopPropagation();
            }}>
                <button className={styles.trash} onClick={async ()=>{
                    if(name.toLowerCase() === "unassigned".toLowerCase()){
                        return;
                    }

                    const res = await fetch(`${getEndpoint("board_by_id")}/${id}`,{
                        method:"DELETE"
                    })
                    if(res.ok){
                        mutateWorkspace();
                        canExit&& closeModal();
                    }
                }}>
                    <Trashcan />
                </button>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (rename === name || name.toLowerCase() === "unassigned".toLowerCase()) {
                        return;
                    }
                    const res = await patchDataAsync(`${getEndpoint("board_by_id")}/${id}`,{
                        name: rename
                    }, false);
                    if(res.ok){
                        mutateWorkspace();
                        canExit&& closeModal();
                    }
                }}>
                    <label> Update Name
                        <input type="text" value={rename} onChange={(e) => {
                            setRename(e.target.value);
                        }} />
                    </label>
                    <button type="submit">Update Name</button>
                </form>
            </motion.div>
        </motion.div>
    )
}

export { EditBoardModal };