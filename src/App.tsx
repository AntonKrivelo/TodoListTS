import { v1 } from 'uuid';
import { useState } from 'react';
import Todolist from './Components/Todolist/Todolist';
import './App.css';
import AddFormItem from './Components/AddFormItem/AddFormItem';
import { TaskType } from './Components/Todolist/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'; // для фильтрации при клике на кнопки
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

// типизация для tasksObj
type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Terminator', isDone: true },
      { id: v1(), title: 'Thor', isDone: false },
    ],
  });

  const addItem = (title: string, todoListId: string) => {
    // добавление таски

    let newTask = { id: v1(), title: title, isDone: false };

    let tasks = tasksObj[todoListId];

    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const removeTask = (idRemove: string, todoListId: string) => {
    // удалить таску при нажатии на крестик
    let tasks = tasksObj[todoListId];

    let deleteTask = tasks.filter((task) => task.id !== idRemove);
    tasksObj[todoListId] = deleteTask;
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    let todolist = todoLists.find((tList) => tList.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  // для изменения таски выполнено или нет isDOne
  // находим таску с таким же id (FIND())
  const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId];

    let task = tasks.find((t) => (t.id === taskId ? true : false));
    if (task) {
      task.isDone = isDone;
    }
    setTasksObj({ ...tasksObj });
  };

  // данные todolist-ов
  const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    { id: todoListId1, title: 'what to learn', filter: 'all' },
    { id: todoListId2, title: 'movies', filter: 'all' },
  ]);

  // удаление todolist
  const removeTodoList = (todoListId: string) => {
    let deletingTodoLists = todoLists.filter((tList) => tList.id !== todoListId);
    setTodoLists(deletingTodoLists);
    //чтобы удалились таски todolist- которого удаллили
    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  };

  //добавление todolist

  const addTodoList = (title: string) => {
    let todoList: TodolistType = { id: v1(), title: title, filter: 'all' };
    setTodoLists([todoList, ...todoLists]);
    setTasksObj({
      ...tasksObj,
      [todoList.id]: [],
    });
  };

  return (
    <div className="App">
      <AddFormItem addItem={addTodoList} />
      {todoLists.map((tList, id) => {
        //для фильтрации
        let tasksForToDoList = tasksObj[tList.id];

        if (tList.filter === 'completed') {
          tasksForToDoList = tasksForToDoList.filter((task) => task.isDone === true); // показывать выполненные таски
        } else if (tList.filter === 'active') {
          tasksForToDoList = tasksForToDoList.filter((task) => task.isDone === false); // показывать невыполненные таски
        }
        //
        return (
          <Todolist
            removeTodoList={removeTodoList}
            key={tList.id}
            id={tList.id}
            changeFilter={changeFilter}
            addItem={addItem}
            removeTask={removeTask}
            tasks={tasksForToDoList}
            title={tList.title}
            filter={tList.filter}
            changeStatus={changeStatus}
          />
        );
      })}
    </div>
  );
}

export default App;
