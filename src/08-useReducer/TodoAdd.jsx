import { useState } from 'react';

const TodoAdd = ({ handleAddTodo }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (description.trim().length <= 1) {
            return;
        }

        handleAddTodo(description);
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                placeholder="Escribe una tarea"
                autoComplete="off"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                type="submit"
                className="btn btn-outline-primary mt-1 btn-block"
            >
                Agregar
            </button>
        </form>
    );
};

export default TodoAdd;