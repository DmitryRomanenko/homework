import { createSlice, nanoid } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';

import { sortItems } from '../../utils';

const initialState = {
  items: [],
};

const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title, description }) => {
        return {
          payload: {
            id: nanoid(),
            title: title,
            description: description,
            status: 'In Progress',
            creationDate: Math.floor(Date.now() / 1000),
            updateDate: Math.floor(Date.now() / 1000),
          },
        };
      },
    },
    setTodoComplete(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, status: item.status != 'Completed' ? 'Completed' : 'In Progress' };
        } else {
          return item;
        }
      });
    },
    deleteTodo(state, action) {
      state.items = state.items.filter((item) => item.id != action.payload);
    },
    editTodo: {
      reducer: (state, action) => {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              title: action.payload.title,
              description: action.payload.description,
              updateDate: action.payload.updateDate,
            };
          } else {
            return item;
          }
        });
      },
      prepare: ({ id, title, description }) => {
        return {
          payload: {
            id: id,
            title: title,
            description: description,
            updateDate: Math.floor(Date.now() / 1000),
          },
        };
      },
    },
  },
});

export const { addTodo, deleteTodo, setTodoComplete, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;

export const selectFilteredTodo = createSelector(
  (state) => state.todo.items,
  (state) => state.option.activeFilter,
  (state) => state.option.activeSortItem,
  (todos, activeFilter, activeSortItem) => {
    const sortName = activeSortItem.options.sortBy;
    const operation = activeSortItem.options.operation;
    if (activeFilter != 'All ToDos') {
      const arr = todos.filter((todo) => todo.status === activeFilter);
      return sortItems(arr, operation, sortName);
    } else {
      return sortItems(todos, operation, sortName);
    }
  },
);
