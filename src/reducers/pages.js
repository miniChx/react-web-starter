/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import Foo from '../components/Foo';
import SubPage from '../components/SubPage';
import { ADD_PAGE, UPDATE_PAGE } from '../actions/types';


const defaultPageConfig = {
  layout:
    [
      [{span: 12}],
      [{span: 12}, {span: 12}],
    ],
  element: [
    {r: 1,c: 1, type: 'button', value: 'text'},
    {r: 2,c: 2, type: 'button', value: 'text'}
  ]
};

const initialState = [
  {
    displayName: 'Foo',
    id: 0,
    pageCode: '',
    comp: Foo(),
    layout:
      [
        [{span: 12}],
        [{span: 12}, {span: 12}],
      ],
    element: [
      {r: 1,c: 1, type: 'button', value: 'text'},
      {r: 2,c: 2, type: 'button', value: 'text'}
    ]
  },
  {
    displayName: 'SubPage',
    id: 1,
    pageCode: '',
    comp: <SubPage />,
    layout:
      [
        [{span: 12}],
        [{span: 12}, {span: 12}],
      ],
    element: [
      {r: 1,c: 1, type: 'button', value: 'text'},
      {r: 2,c: 2, type: 'button', value: 'text'}
    ]
  }
];


export default function pages(state = initialState, action) {
  switch (action.type) {
    case ADD_PAGE:
      return [
        ...state, {...action.payload, id: state.length, ...defaultPageConfig}
      ];
    case UPDATE_PAGE:
      return state.map(p => {
        if(p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      });
    default:
      return state;
  }
}
