/**
 * Created by baoyinghai on 10/24/16.
 */
import { PFetch } from '../network/fetch';

/* eslint-disable */
export const getInitData = (link, param) => {
  return PFetch(link, param).then((d) => d);
};
