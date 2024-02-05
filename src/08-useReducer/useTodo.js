import { useEffect, useReducer, useState } from 'react';
import { todoReducer } from './todoReducer';

const initialState = []

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
  const [ state, dispatch ] = useReducer(todoReducer, initialState, init)
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTodos, setCompletedTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('completedTodos')) || [];
  });

  const [completedTodosTodayCount, setCompletedTodosTodayCount] = useState(0);

  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  const [description, setDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const [newTodosTodayCount, setNewTodosTodayCount] = useState(() => {
    const storedDate = localStorage.getItem('newTodosTodayDate');
    const storedCount = localStorage.getItem('newTodosTodayCount');
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

    if (storedDate === today && storedCount) {
      return Number(storedCount); // Si la fecha almacenada es hoy, devuelve el contador almacenado
    } else {
      return 0; // Si no, devuelve 0
    }
  });

  const handleEditTodo = (todoId) => {
    setEditingTodo(todoId);
  };

  const handleSaveEdit = (todoId, newDescription) => {
    dispatch({ type: 'edit', payload: { id: todoId, description: newDescription } });
  };

  const getPendingTodos = () => {
    return state.filter(todo => !todo.done).length;
  };

  const getNewTodosToday = () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return state.filter(todo => new Date(todo.addedAt) >= startOfToday).length;
  };

  const getCompletedTodosToday = () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return state.filter(todo => todo.done && new Date(todo.completedAt) >= startOfToday).length;
  };

  const getCompletedTodosCount = () => {
    return completedTodos.length;
  };

  const handleOpenModal = (todoId) => {
    const todo = state.find((todo) => todo.id === todoId);
    setSelectedTodo(todo);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedTodo(null); // Establece selectedTodo en null después de cerrar el modal
  }

  const handleConfirmDelete = () => {
    if (selectedTodo) {
      const action = {
        type: 'delete',
        payload: selectedTodo.id
      };
      dispatch(action);
      handleCloseModal();
    } else {
      console.error('No se seleccionó ninguna tarea para eliminar');
    }
  };

  const handleDelete = (todoId) => {
    handleOpenModal(todoId); // Llama a handleOpenModal en lugar de establecer el estado directamente
  };

  const handleAddTodo = (description) => {
    const newTodo = {
      id: new Date().getTime(),
      description,
      done: false,
      addedAt: new Date().toISOString(), // Registra la fecha y hora actuales
    };
  
    const action = {
        type: 'add',
        payload: newTodo
    };
  
    dispatch(action);
  
    // Actualiza el contador de tareas añadidas hoy
    setNewTodosTodayCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('newTodosTodayCount', newCount.toString()); // Almacena el nuevo contador
      localStorage.setItem('newTodosTodayDate', new Date().toISOString().split('T')[0]); // Almacena la fecha actual
      return newCount;
    });
  };

  const handleToggle = (id) => {
    const todo = state.find(todo => todo.id === id);
    if (!todo) return;
  
    // Marca la tarea como completada
    todo.done = true;
    todo.completedAt = new Date().toISOString();
  
    // Mueve la tarea a completedTodos
    setCompletedTodos([...completedTodos, todo]);
  
    // Actualiza el contador de tareas completadas hoy
    setCompletedTodosTodayCount(prevCount => prevCount + 1);
  
    // Elimina la tarea de state
    dispatch({
      type: 'delete',
      payload: id,
    });
  
    // Muestra los confetis cuando se completa una tarea
    setShowConfetti(true);
  
    // Oculta los confetis después de un tiempo
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Ajusta este tiempo según tus necesidades
  };

  return {
    getPendingTodos,
    getNewTodosToday,
    getCompletedTodosToday,
    getCompletedTodosCount,
    state,
    showConfetti,
    description,
    setDescription,
    modalOpen,
    setModalOpen,
    selectedTodo,
    setSelectedTodo,
    editingTodo,
    setEditingTodo,
    editText,
    setEditText,
    completedTodos,
    setCompletedTodos,
    handleEditTodo,
    handleSaveEdit,
    handleOpenModal,
    handleCloseModal,
    handleConfirmDelete,
    handleDelete,
    handleAddTodo,
    handleToggle,
    completedTodosTodayCount,
    newTodosTodayCount,
  };
};