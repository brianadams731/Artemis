import { useEffect, useState } from "react";
import { WorkspaceTile } from "../components/WorkspaceTile";
import { getEndpoint } from "../utils/apiEndpoints";

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
        <div className={styles.wrapper}>
            <h1>Select Workspace</h1>
            {workspaceTiles.map(item=>{
                return (
                    <WorkspaceTile name={item.name} id={item.id}/>
                )
            })}
        </div>
    )

}

export { WorkspaceSelection }

