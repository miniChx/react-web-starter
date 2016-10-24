/**
 * Created by baoyinghai on 10/21/16.
 */

import React from 'react';
import { Row, Col, Button } from 'mxa';
import styles from '../styles/views/cps.less';

const renderComp = (col, isC) => {
  if (col.type === 'button') {
    return (
      <Button type="ghost" >{col.value}</Button>
    );
  }
  if (isC) {
    return (
      <span> null </span>
    );
  }
  console.log('没有该类型的组建: ' + col.type);
  return null;
}

export const constructPage = (layout, element) => {
  element.forEach((el) => {
    const r = el.r - 1;
    const c = el.c - 1;
    if (layout[r] && layout[r][c]) {
      layout[r][c] = {...layout[r][c], ...el};
    }
  });
  return (
    <div>
      {layout.map((row, index) => {
        return (
          <Row key={'row_' + index}>
            {row && row.map((col, i) => {
              return (
                <Col span={col.span} key={'col_' + i} >
                  {renderComp(col)}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};


export const constructPreViewPage = (layout) => {
  const colStyle = [styles.borderColorLight ,styles.borderColorDark];
  return (
    <div>
      {layout.map((row, index) => {
        let tmp = colStyle.shift();
        colStyle.push(tmp);
        return (
          <Row key={'row_' + index} >
            {row && row.map((col, i) => {
              return (
                <Col
                  span={col.span} key={'col_' + i}
                  className={(i % 2) === 1 ? colStyle[0] : colStyle[1]}
                >
                  <span className={styles.colHeight}> i am col</span>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};


export const constructPreViewPageAndElement = (layout, element) => {
  const colStyle = [styles.borderColorLight ,styles.borderColorDark];
  element.forEach((el) => {
    const r = el.r - 1;
    const c = el.c - 1;
    if (layout[r] && layout[r][c]) {
      layout[r][c] = {...layout[r][c], ...el};
    }
  });
  return (
    <div>
      {layout.map((row, index) => {
        let tmp = colStyle.shift();
        colStyle.push(tmp);
        return (
          <Row key={'row_' + index} >
            {row && row.map((col, i) => {
              return (
                <Col
                  span={col.span} key={'col_' + i}
                  className={(i % 2) === 1 ? colStyle[0] : colStyle[1]}
                >
                  {renderComp(col, 'create')}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};


