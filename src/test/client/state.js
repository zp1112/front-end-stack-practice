/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import dogReducer from '../../client/reducers/dog';
import { makeBark } from '../../client/actions/dog';
// In order to be able to call should on any object, we need to run the function should()
// before anything. Some of these assertion are expressions, like mybook.should.be.true,
// which will make ESLint grumpy, so we've added an ESLint comment at the top to disable
// the no-unused-expressions rule in this file.
should();
let store;

describe('APP state', () => {
  describe('Dog', () => {
    beforeEach(() => {
      store = createStore(combineReducers({
        dog: dogReducer
      }));
    });
    describe('makeBark', () => {
      it('should make hasBarked go from false to true', () => {
        store.getState().getIn(['dog', 'hasBarked']).should.be.false;
        store.dispatch(makeBark());
        store.getState().getIn(['dog', 'hasBarked']).should.be.true;
      });
    });
  });
});
