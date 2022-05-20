window.artemisErrorTrackerWorkspaceId = document.currentScript.getAttribute('workspaceId');
window.addEventListener('error', async (e) => {
    await fetch("https://www.thoughtgrove.com/api/errorTracker",{
        method: "POST",
        credentials: "omit",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workspaceId: window.artemisErrorTrackerWorkspaceId,
            stacktrace: e?.error?.stack,
            client: e?.target?.clientInformation?.appVersion,
            location: e?.target?.location?.href,
            message: e?.message
        })
    })
})

