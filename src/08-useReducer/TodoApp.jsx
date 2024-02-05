import { useTodo } from './useTodo';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import Confetti from 'react-confetti';

/**
 * Componente TodoApp.
 * 
 * @returns {JSX.Element} El componente TodoApp.
 */
export const TodoApp = () => {
        const { state, showConfetti, handleAddTodo, handleDelete, handleToggle, handleEditTodo, editText, handleSaveEdit, setEditText, modalOpen, handleConfirmDelete, editingTodo, setEditingTodo, getPendingTodos, getNewTodosToday, getCompletedTodosToday, completedTodosTodayCount, newTodosTodayCount } = useTodo();
    
        return (
            <>
                <h1 className="text-primary text-center">TodoApp</h1>
                <h3 className="text-danger">Actividades pendientes: {getPendingTodos()}</h3>
                <h3 className="text-warning">Actividades añadidas hoy: {newTodosTodayCount}</h3>
                <h3 className="text-success">Actividades completadas hoy: {completedTodosTodayCount}</h3>
                <hr />
    
                <div className="row">
    
                    <div className="col-7">
                        <TodoList 
                            todos={state} 
                            handleDelete={handleDelete} 
                            handleEditTodo={handleEditTodo} 
                            handleSaveEdit={handleSaveEdit} // Aquí está el cambio
                            handleToggle={handleToggle}
                            editText={editText}
                            setEditText={setEditText}
                            editingTodo={editingTodo}
                            setEditingTodo={setEditingTodo}
                        />
                    </div>
    
                    <div className="col-5">
                        <TodoAdd handleAddTodo={handleAddTodo} />
                    </div>
    
                    <DeleteConfirmationModal 
                        isOpen={modalOpen} 
                        onClose={handleConfirmDelete} 
                        onConfirm={handleConfirmDelete} 
                    />
    
                    <footer>
                        <hr />
                        <div className="container text-center">
                            <p>@DevMeps</p>
                            <div className="d-flex justify-content-around">
                                <a href="mailto:devmeps@outlook.com">Contáctame</a>
                                <a href="https://www.tiktok.com/@devmeps" target="_blank" rel="noopener noreferrer">Sígueme en TikTok</a>
                            </div>
                        </div>
                    </footer>
                </div>
    
                {showConfetti && <Confetti run={showConfetti} recycle={false} />}
            </>
        )
}
