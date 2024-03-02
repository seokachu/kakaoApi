import { useState } from 'react';

const EditingForm = (initialState = {}) => {
  const [editingState, setEditingState] = useState(false);
  const [editingValue, setEditingValue] = useState(initialState);

  const onEditingHandler = (e) => {
    const { name, value } = e.target;
    setEditingValue((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingValue(initialState);
  };

  return { editingState, setEditingState, editingValue, setEditingValue, onEditingHandler, resetForm };
};

export default EditingForm;
