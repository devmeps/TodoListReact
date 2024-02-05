const initialState = [{
    id: 1,
    todo: 'Recoletar la Gema de Alma',
    done: false
}];

const todoReducer = ( state = initialState, action = {} ) => {

    if ( action?.type === 'add' ) {
        return [ ...state, action.payload ];
    }

    return state;   
}

let todos = todoReducer();
console.log(todos); // [{ id: 1, todo: 'Recoletar la Gema de Alma', done: false }]

const newTodo = {
    id: 2,
    todo: 'Recoletar la Gema del Poder',
    done: false
};

const addTodoAction = {
    type: 'add',
    payload: newTodo,


}

todos = todoReducer( todos, addTodoAction );
console.log({state: todos}); // [{ id: 1, todo: 'Recoletar la Gema de Alma', done: false }, { id: 2, todo: 'Recoletar la Gema del Poder', done: false }]
