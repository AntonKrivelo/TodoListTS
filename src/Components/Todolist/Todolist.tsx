import { FilterValuesType } from '../../App';
import { useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
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
  addTask: (title: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
};

const Todolist = (props: PropsType) => {
  // для валидации инпута при отправке пустого инпута (Показа ошибки)
  const [error, setError] = useState<string | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const clickKeyBoardBtnAddTask = (e: KeyboardEvent) => {
    // при клике на Enter добавляется таска
    if (e.key === 'Enter') {
      addedTaskBtn();
    }
  };

  const addedTaskBtn = () => {
    // добавить таску при клике на кнопку
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    // берет значение из input-a
    setNewTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  return (
    <div className="item">
      <button onClick={removeTodoList}>x</button>
      <h3>{props.title}</h3>

      <div>
        <input
          onKeyDown={clickKeyBoardBtnAddTask}
          onChange={onChangeTitleTask}
          value={newTaskTitle}
          className={error ? 'todo__input error' : 'todo__input'}
        />

        <button onClick={addedTaskBtn} className="todo__added-btn">
          +
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
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
