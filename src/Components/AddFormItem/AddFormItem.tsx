import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Button, TextField } from '@mui/material';
import './AddFormItem.css';

export type addItemFormPropsType = {
  addItem: (title: string) => void;
};

const AddFormItem = (props: addItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  // для валидации инпута при отправке пустого инпута (Показа ошибки)
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
    // берет значение из input-a
    setNewTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const addedTaskBtn = () => {
    // добавить таску при клике на кнопку
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const clickKeyBoardBtnAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    // при клике на Enter добавляется таска
    if (e.key === 'Enter') {
      addedTaskBtn();
    }
  };

  return (
    <div>
      <TextField
        label="write a task..."
        variant="standard"
        onKeyUp={clickKeyBoardBtnAddTask}
        onChange={onChangeTitleTask}
        value={newTaskTitle}
        className={error ? 'todo__input error' : 'todo__input'}
      />
      <Button variant="outlined" onClick={addedTaskBtn} className="added__task-btn">
        +
      </Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddFormItem;
