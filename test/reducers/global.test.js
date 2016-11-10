
import expect from 'expect';
import reducer from '../../src/reducers/global';

describe('global reducer', () => {

  before(() => {});

  it('should return the initial state', () => {
    const expectedReducer = {
      showLoading: false,
      isInit: false,
      token: '',
    };
    expect(reducer(undefined, {})).toEqual(expectedReducer);
  });
});
