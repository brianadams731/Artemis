import { useEffect, useState } from "react";
import { WorkspaceTile } from "../components/WorkspaceTile";
import { getEndpoint } from "../utils/apiEndpoints";
import { DashboardHeader } from "../components/DashboardHeader";

import styles from "../styles/WorkspaceSelection.module.scss";

interface IWorkspaceTile {
    id: string;
    name: string;
}

const WorkspaceSelection = (): JSX.Element => {
    const [workspaceTiles, setWorkspaceTiles] = useState<IWorkspaceTile[]>();
    useEffect(() => {
        (async function() {
            const rawData = await fetch(getEndpoint("all_workspaces")!);
            const parsedData = await rawData.json();
            setWorkspaceTiles(parsedData);
        }());
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
            <img className={styles.background} src='/assets/WorkSpaceBackground.svg' alt="background"/>
            <div className={styles.tileWrapper}>
                {workspaceTiles.map(item=>{
                    return (
                        <WorkspaceTile name={item.name} id={item.id}/>
                    )
                })}
            </div>
        </div>
        )
    }

export { WorkspaceSelection }