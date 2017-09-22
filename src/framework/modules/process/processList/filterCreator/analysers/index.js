/**
 * Created by vison on 11/16/16.
 */

import BetweenAndAnalyser from './BetweenAndAnalyser';
import DefaultAnalyser from './DefaultAnalyser';
import DropDownListAnalyser from './DropDownListAnalyser';
import TextAnalyser from './TextAnalyser';

const renderFucMap = {
  BetweenAndAnalyser,
  DefaultAnalyser,
  DropDownListAnalyser,
  TextAnalyser
};

export default type => {
  const Handle = renderFucMap[type + 'Analyser'] || renderFucMap.DefaultAnalyser;
  return (item, text, record, index) => new Handle(item, text, record, index).render();
};
