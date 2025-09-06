import { v1 } from 'uuid';
import { useState } from 'react';
import Todolist, { TaskType } from './Components/Todolist/Todolist';
import './App.css';

export type FilterValuesType = 'all' | 'completed' | 'active'; // для фильтрации при клике на кнопки

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all'); // фильтрация по выполненным и не выполненным

  //для фильтрации
  let tasksForToDoList = tasks;

  if (filter === 'completed') {
    tasksForToDoList = tasks.filter((task) => task.isDone === true); // показывать выполненные таски
  } else if (filter === 'active') {
    tasksForToDoList = tasks.filter((task) => task.isDone === false); // показывать невыполненные таски
  }

  const addTask = (title: string) => {
    // добавление таски

    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const removeTask = (idRemove: string) => {
    // удалить таску при нажатии на крестик
    let deleteTask = (prev: Array<TaskType>) => prev.filter((task) => task.id !== idRemove);
    setTasks(deleteTask);
  };

  const changeFilter = (value: FilterValuesType) => {
    // для фильтрации
    setFilter(value);
  };

  // для изменения таски выполнено или нет isDOne
  // находим таску с таким же id (FIND())
  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => (t.id === taskId ? true : false));
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  };

  return (
    <div className="App">
      <Todolist
        changeFilter={changeFilter}
        addTask={addTask}
        removeTask={removeTask}
        tasks={tasksForToDoList}
        title="Learning"
        filter={filter}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
