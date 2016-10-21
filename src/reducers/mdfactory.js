/**
 * Created by baoyinghai on 10/20/16.
 */
import { INCREASE, DECREASE } from '../actions/types';

const initialState = {
  number: 1
};

export default function update(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
