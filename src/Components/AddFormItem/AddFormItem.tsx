import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

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
      setError('Enter the value');
    }
  };

  const clickKeyBoardBtnAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    // при клике на Enter добавляется таска
    if (e.key === 'Enter') {
      addedTaskBtn();
    }
  };

  return (
    <Grid
      direction="row"
      padding="0 50px 0 50px"
      container
      justifyContent="center"
      alignItems="center"
    >
      <TextField
        label="write a task..."
        variant="standard"
        onKeyUp={clickKeyBoardBtnAddTask}
        onChange={onChangeTitleTask}
        value={newTaskTitle}
        error={!!error} // mui ошибка
      />

      <IconButton onClick={addedTaskBtn} className="added__task-btn">
        <ControlPoint />
      </IconButton>
      {error && <div className="error-message">{error}</div>}
    </Grid>
  );
};

export default AddFormItem;
