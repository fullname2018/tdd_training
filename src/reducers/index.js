import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  SUBMIT_TODO,
  DELETE_TODO,
  UNDELETE_TODO,
  INPUT_CHANGED
} from '../actions'

export const initialState = {
  todos: [],
  deleted: {},
  disableAddTodo: true,
  disableUndelete: true,
};

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {

    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = { isFetching: false, didInvalidate: false, items: [] }, action) => {
  switch (action.type) {

    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}
////////////////////////SUBREDDIT END////////////////////////////////
////////////////////////TODOS NOW////////////////////////////////

const todos = (state = initialState, action) => {
  switch (action.type) {

    case SUBMIT_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
          },
        ],
        disableAddTodo: true,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => (
            todo.id !== action.id
          )),
        ],
        deleted: state.todos.filter(todo => todo.id === action.id)[0],
        disableUndelete: false,
      };

    case UNDELETE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          state.deleted,
        ],
        deleted: {},
        disableUndelete: true,
      };

    case INPUT_CHANGED:
      if (action.inputText) {
        return {
          ...state,
          disableAddTodo: false,
        };
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  todos
})

export default rootReducer
