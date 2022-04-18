import { useEffect, useState } from "react";
import { WorkspaceTile } from "../components/WorkspaceTile";
import { getEndpoint } from "../utils/apiEndpoints";
import { IWorkspaceTile } from "../interfaces/IWorkspaceTile";
import { WorkspaceModalState } from "../interfaces/WorkspaceModalState";

import { Plus } from "../components/svg/Plus";

import styles from "../styles/WorkspaceSelection.module.scss";
import { useParams } from "react-router-dom";
import { WorkspaceModal } from "../components/WorkspaceModal";


const WorkspaceSelection = (): JSX.Element => {
    const { id } = useParams();
    
    const [workspaceTiles, setWorkspaceTiles] = useState<IWorkspaceTile[]>();
    const [workspaceModalState, setWorkspaceModalState] = useState<WorkspaceModalState>({ state: "closed" });

    const updateWorkspace = async ():Promise<void> =>{
        const rawData = await fetch(getEndpoint("all_workspaces")!);
        const parsedData:IWorkspaceTile[] = await rawData.json();
        
        parsedData.sort((a:any, b:any)=> a.name.localeCompare(b.name));

        setWorkspaceTiles(parsedData);
    }

    useEffect(() => {
        updateWorkspace();
    }, [])

    if(!workspaceTiles){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className={styles.outerWrap}>
            {workspaceModalState.state === "new" && <WorkspaceModal state={workspaceModalState.state} closeModal={()=>{
                updateWorkspace();
                setWorkspaceModalState({state:"closed"});
            }} />}
            {workspaceModalState.state === "edit" && <WorkspaceModal 
                state={workspaceModalState.state} 
                name={workspaceModalState.workspace.name} 
                id={workspaceModalState.workspace.id}
                closeModal={()=>{
                    updateWorkspace();
                    setWorkspaceModalState({state:"closed"});
            }} />}
            
            <img className={styles.background} src='/assets/WorkSpaceBackground.svg' alt="background"/>
            <div className={styles.tileWrapper}>
                <div className={styles.addTile} onClick={async ()=>{
                    setWorkspaceModalState({state:"new"});
                }}>
                    <Plus />
                </div>
                {workspaceTiles.map(item=>{
                    return (
                        <WorkspaceTile key={item.id} name={item.name} id={item.id} editModal={(workspace: IWorkspaceTile)=>{
                            setWorkspaceModalState({
                                state:"edit",
                                workspace:{
                                    id: workspace.id,
                                    name: workspace.name
                                }
                            })
                        }}/>
                    )
                })}
            </div>
        </div>
        )
    }

export { WorkspaceSelection }