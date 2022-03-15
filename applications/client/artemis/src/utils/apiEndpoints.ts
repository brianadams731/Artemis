interface IEndpoints {
    readonly [key: string]: string;
}

const base =
    process.env.NODE_ENV === "development"
        ? "/api"
        : "http://www.thoughtgrove.com/api";

const endpoints: IEndpoints = Object.freeze({
    workspace_by_id: `${base}/workspace/byId`, // :id is required
    ticket_by_id: `${base}/ticket/byId`, //:ticketId is required
    all_user_workspaces: `${base}/workspace/byUser`, // :userId is required
});

const getEndpoint = (endpoint: string): string | undefined => {
    return endpoints[endpoint];
};

export { getEndpoint };
