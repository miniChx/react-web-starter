import expect from 'expect';
import * as actions from '../../src/actions/global';
import * as types from '../../src/constant/dictActions';

describe('global action', () => {
  it('should create an action to start fetch', () => {
    const expectedAction = {
      type: types.FETCH_START
    };
    expect(actions.fetchStart()).toEqual(expectedAction);
  });

  it('should create an action to end fetch', () => {
    const payload = { token: '123' };
    const expectedAction = {
      type: types.FETCH_END,
      payload,
    };
    expect(actions.fetchEnd(payload)).toEqual(expectedAction);
  });
});
