import { ChangeEvent, useState } from 'react';
import './EditableSpan.css';

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(!editMode);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(!editMode);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ? (
        <input
          className="editable-input"
          value={title}
          onChange={onChangeTitleHandler}
          onBlur={activateViewMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )}
    </div>
  );
};

export default EditableSpan;
