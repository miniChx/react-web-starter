
import { expect } from 'chai';
import reducer from '../../src/reducers/global';
import * as actions from '../../src/actions/global';

describe('global reducer', () => {
  const initReducer = {
    showLoading: false,
    isInit: false,
    token: '',
  };

  it('should return the initial state', () => {
    const expectedReducer = initReducer;
    expect(reducer(undefined, {})).to.eql(expectedReducer);
  });

  it('should handle start fetch', () => {
    const expectedReducer = {
      showLoading: true,
      isInit: false,
      token: '',
    };
    expect(reducer(initReducer, actions.fetchStart())).to.eql(expectedReducer);
  });
  it('should handle end fetch', () => {
    const expectedReducer = {
      showLoading: false,
      isInit: false,
      token: '',
    };
    expect(reducer({
      showLoading: true,
      isInit: false,
      token: '',
    }, actions.fetchEnd())).to.eql(expectedReducer);
  });
});
