import { FilterValuesType } from '../../App';
import { ChangeEvent, MouseEvent } from 'react';
import AddFormItem from '../AddFormItem/AddFormItem';
import './Todolist.css';

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
};

const Todolist = (props: PropsType) => {
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addItem(title, props.id);
  };

  return (
    <div className="item">
      <button onClick={removeTodoList}>x</button>
      <h3>{props.title}</h3>
      <AddFormItem addItem={addTask} />
      <ul className="list__items">
        {props.tasks.map((task, id) => {
          const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          return (
            <li className={task.isDone ? 'todo__item todo__item-active' : 'todo__item'} key={id}>
              <input
                className="todo__checked"
                checked={task.isDone}
                onChange={changeHandler}
                type="checkbox"
              ></input>
              <span className="todo__title">{task.title}</span>
              <button
                onClick={(e: MouseEvent<HTMLButtonElement>) => props.removeTask(task.id, props.id)}
                className="delete-btn"
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div className="change__buttons">
        <button
          className={`change__btn ${props.filter === 'all' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('all', props.id)}
        >
          All
        </button>
        <button
          className={`change__btn ${props.filter === 'active' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('active', props.id)}
        >
          Active
        </button>
        <button
          className={`change__btn ${props.filter === 'completed' ? 'active' : ''}`}
          onClick={(e: MouseEvent<HTMLButtonElement>) => props.changeFilter('completed', props.id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
