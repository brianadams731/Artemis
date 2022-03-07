interface Props{
    name: string;
    id: number;
}

const Example = ({name,id}:Props):JSX.Element =>{
    return(
        <div>
            <h1>{name}</h1>
            <h3>{id}</h3>
        </div>
    )
}

export { Example };