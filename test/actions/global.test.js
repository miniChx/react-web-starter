
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import * as actions from '../../src/actions/global';
import * as types from '../../src/constant/dictActions';

const mockStore = configureMockStore([thunkMiddleware]);

describe('global action', () => {
  after(() => {
    // nock.cleanAll();
  });

  it('should create an action to start fetch', () => {
    const expectedAction = {
      type: types.FETCH_START
    };
    expect(actions.fetchStart()).to.eql(expectedAction);
  });

  it('should create an action to end fetch', () => {
    const payload = { token: '123' };
    const expectedAction = {
      type: types.FETCH_END,
      payload,
    };
    expect(actions.fetchEnd(payload)).to.eql(expectedAction);
  });

  it('should dispatch login action', () => {
    const store = mockStore({});
    const phone = '13312341234';

    const expectedAction = [{
      type: types.AUTH_LOGIN,
      payload: phone + '_ti',
    }];

    return store.dispatch(actions.login(phone)).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
});
