import React from 'react';
import renderer from 'react-test-renderer';
import {Card}  from "./card";
import 'regenerator-runtime/runtime'


const patient = {
        "name": "Cristina Madrid",
        "id": "2ab9448e-0e77-4646-8cac-c6dabda7a573",
        "gender": "female",
        "birthdate": "1967-04-20"
    }

describe('Card Renders correctly', function () {
    it('renders patient card', () => {
        const tree = renderer
          .create(<Card 
            patient={patient}
            />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
  });