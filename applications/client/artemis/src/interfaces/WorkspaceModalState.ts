import {IWorkspaceTile} from "./IWorkspaceTile";

interface WorkspaceModalOpen {
    state: "edit";
    workspace: IWorkspaceTile;
}

interface WorkspaceModalNew {
    state:"new";
}

interface WorkspaceModalClosed {
    state:"closed";
}
 
type WorkspaceModalState = WorkspaceModalOpen | WorkspaceModalClosed | WorkspaceModalNew;

export type { WorkspaceModalState };