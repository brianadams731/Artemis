import useSWR, { KeyedMutator } from "swr";
import { IBoard } from "../../interfaces/IBoard";
import { getEndpoint } from "../../utils/apiEndpoints";
import { fetcher, ResError } from "./fetcher";

interface IWorkspace {
    id: string;
    name: string;
    boards: IBoard[];
}

const useFetchWorkspaceById = (
    workspaceId: string
): {
    workspace: IWorkspace;
    isWorkspaceLoading: boolean;
    workspaceHasError: ResError;
    mutateWorkspace: KeyedMutator<IWorkspace>;
} => {
    const { data, error, mutate } = useSWR(
        `${getEndpoint("workspace_by_id")}/${workspaceId}`,
        fetcher
    );

    return {
        workspace: data,
        isWorkspaceLoading: !error && !data,
        workspaceHasError: error,
        mutateWorkspace: mutate,
    };
};

export { useFetchWorkspaceById };
