import Todolist, { TaskType } from './Components/Todolist/Todolist';
import './App.css';

function App() {


  let tasksLearn:Array<TaskType> = [
    {id: 1, title: 'CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false},
  ]
  
  let tasksMovies:Array<TaskType> = [
    {id: 1, title: 'Terminator', isDone: true},
    {id: 2, title: 'Max payne', isDone: true},
    {id: 3, title: 'Cosmos', isDone: false},
  ]



  return (
    <div className="App">
      <Todolist tasks={tasksLearn} title="What to learn" />
      <Todolist tasks={tasksMovies} title="Movies" />
    </div>
  );
}

export default App;
