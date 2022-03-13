import styles from '../styles/Workspace.module.scss';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd"
import { useState } from 'react';

import { produce } from "immer";

interface ITicket{
    id: string,
    description: string;
}

interface IBoard{
    id: string;
    name: string;
    tickets: ITicket[];
}


const Workspace = ():JSX.Element =>{
    const [boards, setBoards] = useState<IBoard[]>([
        {
            id:'board1',
            name:"Unassigned",
            tickets:[
                {
                   id:"ticket1",
                   description: "Ticket 1" 
                },
                {
                    id:"ticket2",
                    description: "Ticket 2" 
                },
                {
                    id:"ticket3",
                    description: "Ticket 3" 
                }
            ]
        },
        {
            id:'board2',
            name:"Person 1",
            tickets:[
                {
                    id:"ticket4",
                    description: "Ticket 4" 
                },
                {
                    id:"ticket5",
                    description: "Ticket 5" 
                }
            ]
        }
    ])
    const [ticketCount, setTicketCount] = useState<number>(5)

    const dragEnd = (result: DropResult, setBoards:React.Dispatch<React.SetStateAction<IBoard[]>>) =>{
        const {source, destination} = result;
        if(!destination){
            return;
        }
        const sourceBoardId = source.droppableId;
        const destinationBoardId = destination.droppableId;

        const sourceTicketIndex = source.index;
        const destinationTicketIndex = destination.index;
        
        setBoards(
            produce(draft =>{
                const sourceBoard = draft.find((board)=>board.id === sourceBoardId);
                const destinationBoard = draft.find((board)=>board.id === destinationBoardId)
                const moveTicket = sourceBoard?.tickets[sourceTicketIndex];

                sourceBoard?.tickets.splice(sourceTicketIndex,1);
                destinationBoard?.tickets.splice(destinationTicketIndex, 0, moveTicket!);
            })
        )   
    }
    
    return (
        <div className={styles.wrapper}>
            <DragDropContext onDragEnd={(result) => dragEnd(result, setBoards)}>
                {boards.map((board)=>(
                    <div key={board.id}>
                        <div className={styles.addTicket} onClick={()=>{
                            setBoards(
                                produce(draft =>{
                                    const sourceBoard = draft.find((item)=>item.id === board.id);
                                    sourceBoard?.tickets.push({
                                        id:`ticket${ticketCount + 1}`,
                                        description: `Ticket ${ticketCount + 1}`, 
                                    })
                                })
                            )
                            setTicketCount(prev => prev+1);
                        }}>
                            + Add Ticket
                        </div>
                        <Droppable droppableId={board.id}>
                            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.board} style={snapshot.isDraggingOver?{backgroundColor:'#00F0FF'}:{}}>
                                    <h2>{board.name}</h2>
                                    {board.tickets.map((ticket, index) =>(
                                        <Draggable draggableId={ticket.id} index={index} key={ticket.id}>
                                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot)=>(
                                                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={styles.ticket} style={{...provided.draggableProps.style}}>
                                                    {ticket.description}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}  
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    )
}

export { Workspace };