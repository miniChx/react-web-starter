
import { expect } from 'chai';
import * as actions from '../../src/actions/global';
import * as types from '../../src/constant/dictActions';

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
});
