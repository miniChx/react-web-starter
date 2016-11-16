import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import { Home } from '../../src/components/Home';

describe('<Home />', () => {
  const shallowWrapper = shallow(<Home />);
  const mountWrapper = mount(<Home />);

  it('contains home spec', () => {
    expect(shallowWrapper.is('.home')).to.equal(true);
  });

  it('contains spec with an expectation', () => {
    expect(mountWrapper.find('.jump').length).to.equal(0);
  });

  it('App\'s title should be Todos', () => {
    expect(shallowWrapper.find('a').text()).to.equal('跳转到用户管理');
  });
});
