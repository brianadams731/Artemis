interface ResError extends Error {
    info?: any;
    status?: number;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error: ResError = new Error("Error: Cannot fetch data");
        error.info = await res.json;
        error.status = res.status;
        throw error;
    }
    return res.json();
};

export { fetcher };
export type { ResError };
