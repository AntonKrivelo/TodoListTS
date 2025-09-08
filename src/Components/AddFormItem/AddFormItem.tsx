import { useState, ChangeEvent, KeyboardEvent } from 'react';

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

  const clickKeyBoardBtnAddTask = (e: KeyboardEvent) => {
    // при клике на Enter добавляется таска
    if (e.key === 'Enter') {
      addedTaskBtn();
    }
  };

  return (
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
  );
};

export default AddFormItem;
