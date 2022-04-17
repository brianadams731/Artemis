import { Route, Routes } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { Workspace } from "./Workspace";

import {WorkspaceSelection} from "../pages/WorkspaceSelection";

const Dashboard = (): JSX.Element => {
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