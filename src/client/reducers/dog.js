import Immutable from 'immutable';
import { MAKE_BARK } from '../actions/dog';

// 防止改变原有对象，state.set使得返回一下新对象而不该有原有的。
const initialState = Immutable.Map({
  hasBarked: false
});

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_BARK:
      return state.set('hasBarked', action.payload);
    default:
      return state;
  }
};

export default dogReducer;
