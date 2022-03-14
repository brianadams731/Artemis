const patchDataAsync = async (url: string, dataToPost: any, parseJson: boolean = true) => {
    try {
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToPost),
        });
        if (parseJson) {
            return await res.json();
        }
        return res;
    } catch (Error) {
        console.log(`Error: ${url} failed to send`);
    }
};

export { patchDataAsync };
