import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import { Home } from '../../src/components/Home';

describe('<Home />', () => {
  const wrapper = shallow(<Home />);

  it('contains home spec', () => {
    expect(wrapper.is('.home')).to.equal(true);
  });

  it('contains spec with an expectation', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find('.jump').length).to.equal(0);
  });

  it('App\'s title should be Todos', () => {
    expect(wrapper.find('a').text()).to.equal('跳转到用户管理');
  });
});
