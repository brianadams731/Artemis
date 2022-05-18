interface IEndpoints {
    readonly [key: string]: string;
}

const base =
    process.env.NODE_ENV === "development"
        ? "/api"
        //: "http://www.thoughtgrove.com/api";
        :"http://34.125.22.156/api";

const endpoints: IEndpoints = Object.freeze({
    workspace_debug: `${base}/workspace/debug`,
    workspace_by_id: `${base}/workspace/byId`, // :id is required
    workspace_add: `${base}/workspace/add`,
    all_user_workspaces: `${base}/user/workspaces`,
    all_workspaces: `${base}/workspace/all`,
    
    ticket_by_id: `${base}/ticket/byId`, //:ticketId is required
    add_ticket_by_boardId: `${base}/ticket/add/byBoardId`,// :boardId is required
    mark_ticket_open: `${base}/ticket/open`, // :ticketId is required
    mark_ticket_closed: `${base}/ticket/close`, // :ticketId is required
    get_count: `${base}/ticket/count`, //:workspaceId is required

    board_get_all_debug: `${base}/board/get-all-debug`,
    board_search_by_name: `${base}/board/search/byName/`, // :boardName is required
    board_update_ticket: `${base}/board/updateTickets`,
    board_by_id: `${base}/board/byId`, // :boardId is required
    board_add: `${base}/board/add`, // :workspaceId is required
    
    login: `${base}/login`,
    logout: `${base}/logout`,
    login_test: `${base}/login/test`,
    register: `${base}/register`,

    profile: `${base}/user/profile`,
    subscribe: `${base}/workspace/subscribe`, //:workspaceId is required  GET TO SUBSCRIBE/DELETE TO UNSUBSCRIBE
});

const getEndpoint = (endpoint: string): string | undefined => {
    return endpoints[endpoint];
};

export { getEndpoint };
