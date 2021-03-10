import { useEffect, useState, useContext } from "react"
import styles from '../styles/boardslist.module.scss'
import { Card, CardBody, CardHeader, CardFooter, FormInput, Button, Container, Row, Col } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditText } from 'react-edit-text';
import { HiX } from "react-icons/hi";
import Task from './Task'
import withAuth from './withAuth'
import ModalTask from './ModalTask'
import 'react-edit-text/dist/index.css';
import axios from "axios";
import { mainContext } from '../providers/AuthContext'



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log(result)
    return result;
};


function BoardsList(props) {
    const context = useContext(mainContext)
    const [boards, setBoards] = useState([]) //List of boards
    const [inputData, setInputData] = useState({}) //Input for the new task
    const [loading, toggleLoading] = useState(true)

    useEffect(() => {
        console.log(context)
        axios.get("http://localhost:8000/trello-api/user/" + context.authToken)
            .then(res => {
                console.log(res.data)
                setBoards([...res.data.boards])
                toggleLoading(!loading)
            })
    }, [])

    //console.log(boards.tasks)
    function onDragEnd(result) {
        //console.log(result)
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) { console.log(result); return }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(boards[sInd].tasks, source.index, destination.index);
            const newBoards = [...boards];
            console.log(newBoards)
            newBoards[sInd].tasks = items;
            setBoards(newBoards);
            updateBoardsToBackend()
        } else {
            const result = move(boards[sInd].tasks, boards[dInd].tasks, source, destination);
            const newBoards = [...boards];
            console.log(newBoards)
            newBoards[sInd].tasks = result[sInd];
            newBoards[dInd].tasks = result[dInd];

            //setBoards(newBoards.filter(group => group.tasks.length));
            setBoards(newBoards);
            //
            updateBoardsToBackend()


        }
    }

    //Updates the boards to backend
    const updateBoardsToBackend = () => {
        console.log("ye")
        axios.post('http://localhost:8000/trello-api/user/' + context.authToken, { boards: boards })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const updateBoardTitle = (val, ind) => {
        const newBoards = [...boards]
        newBoards[ind].title = val
        setBoards(newBoards)
    }
    const pushBoardTitleUpdate = (evt) => {
        if (evt.keyCode == 13) {
            updateBoardsToBackend()
        }
    }

    //Function that deletes the given task on the given board
    const delTask = (index_board, index_task) => {
        console.log(index_board)
        const newBoards = [...boards];
        newBoards[index_board].tasks.splice(index_task, 1);
        setBoards(
            newBoards.filter(group => group.tasks.length)
        );
        updateBoardsToBackend()
    }

    //Function that creates a new task on the current board
    const insertNewTask = (evt) => {
        if (evt.keyCode == 13) {
            console.log(inputData)
            const newBoards = [...boards]
            newBoards[inputData.index_board].tasks.push({ id: "id-" + new Date().getTime(), content: inputData.val })
            setBoards(newBoards)
            updateBoardsToBackend()
        }
    }
    //Function that updates the given task on the given board
    const updateTaskInfo = (board_index, task_index, new_text) => {
        const newBoards = [...boards]
        newBoards[board_index].tasks[task_index].content = new_text
        setBoards(newBoards)
        console.log(board_index, task_index, new_text)
        updateBoardsToBackend()
    }

    //Flag Hook to open the dialog and to manage the modal
    const [openDialog, toggleDialog] = useState(false)
    const [clicked_board_index, setClickedBoardIndex] = useState(-1)
    const [clicked_task_index, setClickedTaskIndex] = useState(-1)
    //

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            { openDialog && <ModalTask openFunc={openDialog} toggleFunc={toggleDialog} boards={boards} board_idx={clicked_board_index} task_idx={clicked_task_index} deltask={delTask} updateTaskFunc={updateTaskInfo} />}
            {loading
                ? "Loading...."
                : <Row className={styles.mainBoardsContainer__mainRow}>
                    {boards.map((el, board_index) => (
                        <Col key={board_index + "_" + el.title} sm="6" md="3" lg="3">
                            <Card className={styles.boardPanel}>
                                <CardHeader className={styles.boardPanel__header}>
                                    <Container fluid>
                                        <Row className={styles.boardPanel__header__mainRow}>
                                            <Col sm="10" md="10" lg="10">
                                                <h5 onKeyDown={pushBoardTitleUpdate} >
                                                    <EditText
                                                        name="textbox1"
                                                        value={el.title}
                                                        onChange={(val) => updateBoardTitle(val, board_index)}
                                                    />
                                                </h5>
                                            </Col>
                                            <Col sm="2" md="2" lg="2">
                                                <HiX className={styles.boardPanel__header__closeCross} size="1.8em" onClick={() => {
                                                    const newBoards = [...boards];
                                                    //newBoards[board_index].tasks = []
                                                    newBoards.splice(board_index, 1);
                                                    setBoards(newBoards)
                                                }} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </CardHeader>
                                <CardBody className={styles.boardPanel__body}>
                                    <Droppable key={board_index} droppableId={`${board_index}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {el.tasks.map((item, task_index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={task_index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <Card className={styles.task_card}
                                                                innerRef={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                onClick={() => { toggleDialog(true); setClickedBoardIndex(board_index); setClickedTaskIndex(task_index) }}
                                                            >
                                                                <CardBody key={task_index} className={styles.card_body}>
                                                                    <Task key={item.id} index_task={task_index} index_board={board_index} text_v={item.content} />
                                                                </CardBody>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </CardBody>
                                <CardFooter>
                                    <FormInput size="sm" placeholder="Inserisci nuovo task" onChange={(evt) => setInputData({ val: evt.target.value, index_board: board_index })} onKeyDown={insertNewTask} className="mb-2" /> {/** */}
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                    <Col md="3">
                        <br /><br />
                        <div className={styles.mainBoardsContainer__addBoard}>
                            <Button onClick={() => {
                                setBoards([...boards, { title: "Nuova Sezione", tasks: [] }]);
                            }}>Nuova sezione</Button>
                        </div>
                    </Col>
                </Row>
            }
        </DragDropContext>

    );
}

export default withAuth(BoardsList)


