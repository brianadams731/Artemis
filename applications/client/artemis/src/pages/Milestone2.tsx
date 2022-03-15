import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEndpoint } from "../utils/apiEndpoints";

const Milestone2 = (): JSX.Element => {
    interface Ticket {
        id: number;
        description: string;
        comment: string;
        openDate: string;
    }
    interface Board {
        name: string;
        tickets: Ticket[];
    }
    const [board, setBoard] = useState<Board>();
    const [searchBox, setSearchBox] = useState<string>("");
    useEffect(() => {
        (async () => {
            const res = await fetch(getEndpoint("board_get_all_debug")!)
            const parsedRes = await res.json();
            setBoard(parsedRes);
        })()
    }, [])

    if (!board) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <Link to="/workspace">Click to View Work Space Example</Link>

            <form onSubmit={(e) => {
                e.preventDefault();
                searchBox !== "" ?
                    (async () => {
                        const res = await fetch(`${getEndpoint("board_search_by_name")}${searchBox}`)
                        const parsedRes = await res.json();
                        setBoard(parsedRes);
                    })() :
                    (async () => {
                        const res = await fetch(getEndpoint("board_get_all_debug")!)
                        const parsedRes = await res.json();
                        setBoard(parsedRes);
                    })();
            }}>
                <input type="text" value={searchBox} onChange={(e) => {
                    setSearchBox(e.target.value);
                }} />
                <button type="submit">Search</button>
            </form>

            <pre style={{ fontSize: ".7rem" }}>
                {JSON.stringify(board, null, 2)}
            </pre>
        </main>
    )
}

export { Milestone2 };