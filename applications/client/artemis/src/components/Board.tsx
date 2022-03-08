import { useState } from 'react';
import { Reorder } from "framer-motion";
import styles from "../styles/Board.module.scss";

interface Props{
    id:number;
}
interface ITicket {
    id: number;
    description: string;
    comments: string|null;
    openDate: Date;
    closeDate: Date|null;
}

const Board = ({id}:Props):JSX.Element =>{
    const [tickets,setTickets] = useState<ITicket[]>([]);
    return (
        <section className={styles.wrapper}>

            <Reorder.Group values={tickets} onReorder={setTickets}>
                {tickets.map((item)=>(
                    <Reorder.Item key={item.id} drag value={item} whileDrag={{scale:1.1}} className={styles.wrapper} onDragEnd={(e, info)=>{
                        if(info.point.x){
                            
                        }
                    }}>
                        {item.description}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <div className={styles.addTicket} onClick={()=>{
                setTickets(prev=>[...tickets, {
                    id: prev.length + 1,
                    description: `test ${prev.length+1}`,
                    comments: "test comment",
                    openDate: new Date(),
                    closeDate: null,
                }])
            }}>
                <h3>Add Ticket</h3>
            </div>
        </section>
    )
}

export { Board };