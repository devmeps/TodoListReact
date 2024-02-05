import React from 'react';
import Confetti from 'react-confetti';

const TodoList = ({ todos, handleDelete, handleEditTodo, handleSaveEdit, editingTodo, editText, setEditText, setEditingTodo, handleToggle, handleOpenModal }) => {
    return (
        <div>
            {todos.length === 0 ? (
                <p style={{ color: 'green', fontSize: '18px' }}>Felicidades, no tienes tareas pendientes</p>
            ) : (
                <ul className="list-group">
                    {todos.map(todo => (
                        <li key={todo.id} className="list-group-item"> 
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flex: 1, marginRight: '10px' }}>{todo.description}</span> 
                            {editingTodo === todo.id ? (
                                <div>
                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    <button className="btn btn-success btn-sm m-2 " onClick={() => {
                                        handleSaveEdit(todo.id, editText);
                                        setEditingTodo(null); // Detiene la edición después de guardar los cambios
                                    }}>
                                        Guardar
                                    </button>
                                    <button className="btn btn-warning btn-sm m-2" onClick={() => setEditingTodo(null)}>
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-secondary btn-sm float-end" onClick={() => {
                                        handleEditTodo(todo.id);
                                        setEditText(todo.description); // Establece editText al valor actual de la descripción de la tarea
                                    }}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm float-end" onClick={() => handleDelete(todo.id)}>
                                        Borrar
                                    </button>
                                    <button className="btn btn-primary btn-sm float-end" onClick={() => handleToggle(todo.id)}>
                                        {todo.done ? 'Confirmar' : 'Completar'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;