import expect from 'expect';
import reducer from '../../src/reducers/global';

describe('count reducer', () => {

  before(() => {});

  it('should return the initial state', () => {
    const expectedReducer = {
      showLoading: false,
      isInit: false
    };
    expect(reducer(undefined, {})).toEqual(expectedReducer);
  });
});
