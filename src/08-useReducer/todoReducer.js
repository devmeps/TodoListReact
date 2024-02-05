export const todoReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'delete':
        return state.filter(todo => todo.id !== action.payload);
        case 'toggle':
            return state.map(todo => {
              if (todo.id === action.payload.id) {
                return {
                  ...todo,
                  done: !todo.done,
                  completedAt: action.payload.completedAt,
                };
              } else {
                return todo;
              }
            });
      case 'edit':
        return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, description: action.payload.description } : todo
        );
      default:
        return state;
    }
  };