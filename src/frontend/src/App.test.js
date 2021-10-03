import React from 'react';
import { shallow, mount } from "enzyme";
import renderer from 'react-test-renderer';
import { shallowToJson  } from 'enzyme-to-json';
import { app } from "./App";
// import "../setupTests"

import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


describe('Test App Entry point', function () {
  it('renders correctly', function () {
    // const wrapper = mount(<app/>).toJSON()
    // expect(wrapper.find("p").text()).toEqual("Why, if it isn't a running React app! A truly fine sight indeed.");
  //   const tree = renderer
  //   .create(<app/>)
  //   .toJSON();
  // expect(tree).toMatchSnapshot();
  const wrapper = shallow(<app />);
  // expect(wrapper).toMatchSnapshot();

  // expect(toJson(wrapper)).toMatchSnapshot();
  });
    it('renders correctly', () => {
      const tree = renderer
        .create(<app/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});