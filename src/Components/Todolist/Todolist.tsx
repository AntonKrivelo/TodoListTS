import { FilterValuesType } from '../../App';
import './Todolist.css';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (idRemove: number) => void;
  changeFilter: (value: FilterValuesType) => void;
  filter: FilterValuesType;
};

const Todolist = (props: PropsType) => {
  return (
    <div className="item">
      <h3>{props.title}</h3>
      <div>
        <input className="todo__input" />
        <button className="todo__added-btn">+</button>
      </div>
      <ul className="list__items">
        {props.tasks.map((task, id) => (
          <li className="todo__item" key={id}>
            <input className="todo__checked" checked={task.isDone} type="checkbox"></input>
            <span className="todo__title">{task.title}</span>
            <button onClick={() => props.removeTask(task.id)} className="delete-btn">
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="change__buttons">
        <button
          className={`change__btn ${props.filter === 'all' ? 'active' : ''}`}
          onClick={() => props.changeFilter('all')}
        >
          All
        </button>
        <button
          className={`change__btn ${props.filter === 'active' ? 'active' : ''}`}
          onClick={() => props.changeFilter('active')}
        >
          Active
        </button>
        <button
          className={`change__btn ${props.filter === 'completed' ? 'active' : ''}`}
          onClick={() => props.changeFilter('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
