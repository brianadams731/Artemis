import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEndpoint } from "../utils/apiEndpoints";
// import m2 from "../styles/Milestone2CSS";

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
            <Link  to="dashboard/workspace/4b786df1-9fd3-4f17-a6d6-b339756fb562">Click to View Work Space Example</Link>

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
                <input  type="text" value={searchBox} onChange={(e) => {
                    setSearchBox(e.target.value);
                }} />
                <button type="submit">Search</button>
            </form>
            <pre>
                {JSON.stringify(board, null, 2)}
            </pre>
        </main>
    )
}

export { Milestone2 };