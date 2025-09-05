import { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Components/Todolist/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'; // для фильтрации при клике на кнопки

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all'); // фильтрация по выполненным и не выполненным

  console.log(filter);

  //для фильтрации
  let tasksForToDoList = tasks;

  if (filter === 'completed') {
    tasksForToDoList = tasks.filter((task) => task.isDone === true); // показывать выполненные таски
  } else if (filter === 'active') {
    tasksForToDoList = tasks.filter((task) => task.isDone === false); // показывать невыполненные таски
  }

  const removeTask = (idRemove: number) => {
    // удалить таску при нажатии на крестик
    let deleteTask = (prev: Array<TaskType>) => prev.filter((task) => task.id !== idRemove);
    setTasks(deleteTask);
  };

  const changeFilter = (value: FilterValuesType) => {
    // для фильтрации
    setFilter(value);
  };

  return (
    <div className="App">
      <Todolist
        changeFilter={changeFilter}
        removeTask={removeTask}
        tasks={tasksForToDoList}
        title="Learning"
        filter={filter}
      />
    </div>
  );
}

export default App;
