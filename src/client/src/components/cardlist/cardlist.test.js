import React from 'react';
import renderer from 'react-test-renderer';
import {CardList}  from "./cardlist";
import 'regenerator-runtime/runtime'


const patients = [
    {
        "name": "Cristina Madrid",
        "id": "2ab9448e-0e77-4646-8cac-c6dabda7a573",
        "gender": "female",
        "birthdate": "1967-04-20"
    },
    {
        "name": "Cristine Labadie",
        "id": "e1943f44-dea5-4574-b824-622a5ddd2fd7",
        "gender": "female",
        "birthdate": "1978-11-14"
    },
    {
        "name": "Cruz Halvorson",
        "id": "a8ddde95-60c6-4aae-9db8-bb863179ebc3",
        "gender": "female",
        "birthdate": "1954-02-15"
    },
    {
        "name": "Cristobal Alcántar",
        "id": "db5c2af9-8854-4f8c-a2e9-30640aa3b4b6",
        "gender": "male",
        "birthdate": "1936-08-18"
    },
    {
        "name": "Crysta Rogahn",
        "id": "deaa60ba-499a-4d3f-8b8f-78f10ae34c0e",
        "gender": "female",
        "birthdate": "2003-06-01"
    }
]

describe('CardList Renders correctly', function () {
    it('renders patients', () => {
        const tree = renderer
          .create(<CardList patients={patients} searchResult={true} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('renders empty search result', () => {
        const tree = renderer
          .create(<CardList patients={[]} searchResult={false} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
  });