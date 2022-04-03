import { Route, Routes } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { Workspace } from "./Workspace";

const Dashboard = (): JSX.Element => {
    return (
        <>
            <DashboardHeader />
            <Routes>
                <Route path="workspace/:id" element={<Workspace />} />
            </Routes>
        </>
    )
}

export { Dashboard };