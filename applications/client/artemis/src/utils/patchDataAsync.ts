const patchDataAsync = async (url: string, dataToPost: any, parseJson: boolean = true) => {
    console.log(dataToPost);
    
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
    } catch (err) {
        console.log(err);
        console.log(`Error: ${url} failed to send`);
    }
};

export { patchDataAsync };
