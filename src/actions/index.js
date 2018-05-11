export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const SUBMIT_TODO = 'SUBMIT_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UNDELETE_TODO = 'UNDELETE_TODO'
export const INPUT_CHANGED = 'INPUT_CHANGED'

let todoId = 0;

const nextId = () => {
  todoId += 1;
  return todoId;
};

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}
//////////////////////////////SUBREDDIT END////////////////////////////////////
//////////////////////////////TODOS NOW////////////////////////////////////

export const submitTodo = (todo, text) => ({

  type: types.SUBMIT_TODO,
  id: nextId(),
  text,

})

export const deleteTodo = (todo, id) => ({
  type: types.DELETE_TODO,
  id,
})

export const undeleteTodo = todo => ({
  type: types.UNDELETE_TODO,
})

export const inputChanged = (inputText) => ({
  type: types.INPUT_CHANGED,
  inputText,
})

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
