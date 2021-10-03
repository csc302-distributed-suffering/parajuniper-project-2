import React from 'react';
import renderer from 'react-test-renderer';
import App  from "./App";

describe('Test App Entry point', function () {
  // it('renders correctly', function () {
  // const wrapper = shallow(<App/>);
  // // expect(wrapper).toMatchSnapshot();
  // // expect(toJson(wrapper)).toMatchSnapshot();
  // });
  it('renders correctly', () => {
      const tree = renderer
        .create(<App/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});
