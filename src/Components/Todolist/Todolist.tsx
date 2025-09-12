import { FilterValuesType } from '../../App';
import { ChangeEvent, MouseEvent } from 'react';
import AddFormItem from '../AddFormItem/AddFormItem';
import './Todolist.css';
import EditableSpan from '../EditableSpan/EditableSpan';
import { Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (idRemove: string, todoListId: string) => void;
  addItem: (title: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, id: string) => void;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Todolist = (props: PropsType) => {
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  return (
    <Paper elevation={3} className="item">
      <Button
        className="item-close"
        startIcon={<HighlightOffOutlinedIcon />}
        onClick={removeTodoList}
      ></Button>
      <EditableSpan title={props.title} onChange={changeTodoListTitle} />
      <AddFormItem addItem={addTask} />
      <ul className="list__items">
        {props.tasks.map((task, id) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            // для изменения чекбокса
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            // для изменения названия инпута таски
            props.changeTaskTitle(task.id, newValue, props.id);
          };
          //
          const removeTaskItem = () => {
            // удаление таски при клике на крестик
            props.removeTask(task.id, props.id);
          };
          return (
            <li className={task.isDone ? 'todo__item todo__item-active' : 'todo__item'} key={id}>
              <Checkbox
                {...label}
                className="todo__checked"
                checked={task.isDone}
                onChange={onChangeStatusHandler}
                defaultChecked
              ></Checkbox>
              <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
              <Button
                startIcon={<DeleteIcon />}
                onClick={removeTaskItem}
                className="delete-btn"
              ></Button>
            </li>
          );
        })}
      </ul>
      <div className="change__buttons">
        <Button
          className={`change__btn ${props.filter === 'all' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('all', props.id)}
        >
          All
        </Button>
        <Button
          className={`change__btn ${props.filter === 'active' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('active', props.id)}
        >
          Active
        </Button>
        <Button
          className={`change__btn ${props.filter === 'completed' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('completed', props.id)}
        >
          Completed
        </Button>
      </div>
    </Paper>
  );
};

export default Todolist;
