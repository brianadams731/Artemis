interface IEndpoints {
    readonly [key: string]: string;
}

const base =
    process.env.NODE_ENV === "development"
        ? "/api"
        : "http://www.thoughtgrove.com/api";

const endpoints: IEndpoints = Object.freeze({
    workspace_debug: `${base}/workspace/debug`,
    workspace_by_id: `${base}/workspace/byId`, // :id is required
    all_user_workspaces: `${base}/workspace/byUser`, // :userId is required
    
    ticket_by_id: `${base}/ticket/byId`, //:ticketId is required
    add_ticket_by_boardId: `${base}/ticket/add/byBoardId`,// :boardId is required

    board_get_all_debug: `${base}/board/get-all-debug`,
    board_search_by_name: `${base}/board/search/byName/`, // :boardName is required
    board_update_ticket: `${base}/board/updateTickets`,
    board_by_id: `${base}/board/byId`, // :boardId is required
    board_add: `${base}/board/add/`, // :workspaceId is required
    
    login: `${base}/login`,
    register: `${base}/register`
});

const getEndpoint = (endpoint: string): string | undefined => {
    return endpoints[endpoint];
};

export { getEndpoint };
