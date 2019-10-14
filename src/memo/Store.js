import { createStore } from 'redux';

const initData = {
  data: [],
  message: 'please type message:',
  mode: 'default',
  fdata: []
};

export function memoReducer(state = initData, action) {
  switch (action.type) {
    case 'ADD':
      return addReduce(state, action);
    case 'FIND':
      return findReduce(state, action);
    case 'DELETE':
      return deleteReduce(state, action);
    default:
      return state;
  }
}

function addReduce(state, action) {
  let d = new Date();
  let f = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  let data = {
    message: action.message,
    created: f
  };
  let newdata = state.data.slice();
  newdata.unshift(data);
  return {
    data: newdata,
    message: 'Added!',
    mode: 'default',
    fdata: []
  };
}

function findReduce(state, action) {
  let f = action.find;
  let fdata = [];
  state.data.forEach((value) => {
    if (value.message.indexOf(f) >= 0) {
      fdata.push(value)
    }
  });
  return {
    data: state.data,
    message: 'find "' + f + '":',
    mode: 'find',
    fdata: fdata
  };
}

function deleteReduce(state, action) {
  let newdata = state.data.slice();
  newdata.splice(action.index, 1);
  return {
    data: newdata,
    message: 'delete "' + action.index + '":',
    mode: 'delete',
    fdata: []
  }
}

// Action Creator

// Action on add
export function addMemo(text) {
  return {
    type: 'ADD',
    message: text
  }
} 

export function deleteMemo(ind) {
  return {
    type: 'DELETE',
    index: ind
  }
}

export function findMemo(text) {
  return {
    type: 'FIND',
    find: text
  }
}

// Create Store
export default createStore(memoReducer);