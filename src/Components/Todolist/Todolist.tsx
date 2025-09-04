import { FilterValuesType } from '../../App';

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
};

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task, id) => (
          <li key={id}>
            <input checked={task.isDone} type="checkbox"></input>
            <span>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)} className="delete-btn">
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
