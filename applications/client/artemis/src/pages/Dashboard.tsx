import { Route, Routes, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { Workspace } from "./Workspace";

import {WorkspaceSelection} from "../pages/WorkspaceSelection";
import { useEffect, useState } from "react";
import { getEndpoint } from "../utils/apiEndpoints";

const Dashboard = (): JSX.Element => {
    const [canViewDash, setCanViewDash] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(()=>{
        (async function(){
            const rawData = await fetch(getEndpoint("login_test")!);          
            if(rawData.status === 200){
                setCanViewDash(true);              
                return;
            }
            navigate("/login")
        }())
    },[])

    if(!canViewDash){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            <DashboardHeader />
            <Routes>
                <Route path="workspace/:id" element={<Workspace />} />
                <Route path="select" element={<WorkspaceSelection />} />
            </Routes>
        </>
    )
}

export { Dashboard };