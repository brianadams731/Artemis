import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEndpoint } from "../utils/apiEndpoints";

const Milestone2 = (): JSX.Element => {
    interface WorkSpaceDebug {
        id: string
    }
    const [debug, setDebug] = useState<WorkSpaceDebug[]>();
    useEffect(() => {
        (async function () {
            const rawReq = await fetch(getEndpoint("workspace_debug")!);
            const parsedReq = await rawReq.json();
            setDebug(parsedReq)
        }());
    })
    if (!debug) {
        return <h1>Loading Debug Menu...</h1>
    }
    return (
        <main>
            {debug.map((item) => {
                return (
                        <Link style={{display:"block"}} to={`dashboard/workspace/${item.id}`}>Click to View Workspace ID {item.id}</Link>
                )
            })}
        </main>
    )
}

export { Milestone2 };