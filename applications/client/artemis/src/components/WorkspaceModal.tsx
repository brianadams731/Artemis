import { useState } from "react";
import ReactDOM from "react-dom";

import styles from "../styles/WorkspaceModal.module.scss";
import { getEndpoint } from "../utils/apiEndpoints";
import { patchDataAsync } from "../utils/patchDataAsync";
import { postDataAsync } from "../utils/postDataAsync";

interface Base{
    closeModal: ()=>void;
}


interface EditWorkspace extends Base{
    state: "edit";
    id: string;
    name: string;
}

interface NewWorkspace extends Base{
    state: "new";

    id?: string;
    name?:string;
}

type Props = EditWorkspace | NewWorkspace;

const WorkspaceModal = ({state, id, name, closeModal}:Props):JSX.Element => {
    const [editName, setEditName] = useState<string>(state==="edit"?name:"");
    return ReactDOM.createPortal (
        <div className={styles.wrapper} onClick={()=>closeModal()}>
            <div className={styles.modalWrapper} onClick={(e)=>{
                e.stopPropagation();
            }}>
                <form onSubmit={async (e)=>{
                    e.preventDefault();
                    if(!editName){
                        return;
                    }
                    if(state === "new"){
                        const rawRes = await postDataAsync(getEndpoint("workspace_add")!,{
                            "name": editName
                        }, false);             
                        if(rawRes.ok){
                            closeModal();
                        }else{
                            alert(`ERROR: DATA DID NOT POST`);
                        }
                    }else if(state === "edit"){
                        const rawRes = await patchDataAsync(`${getEndpoint("workspace_by_id")}/${id}`,{
                            "name": editName
                        }, false);
                        if(rawRes.ok){
                            closeModal();
                        }else{
                            alert(`ERROR: UPDATE FAILED`);
                        }
                    }
                }}>
                    <input type="text" value={editName} onChange={(e)=>{
                        setEditName(e.target.value);
                    }}/>
                    <button type="submit">{state === "new"?"Add Workspace":"Update"}</button>
                </form>
                {state === "edit" && <button onClick={async (e)=>{ //delete button here
                    e.preventDefault();
                    const rawRes = await fetch(`${getEndpoint("workspace_by_id")}/${id}`,{
                        method: "DELETE"
                    });
                    if(rawRes.ok){
                        closeModal();
                    }else{
                        alert("ERROR: Did not delete")
                    }
                }}>Delete</button>}
            </div>
        </div>
    ,document.querySelector("#portal1")!)
}

export { WorkspaceModal }