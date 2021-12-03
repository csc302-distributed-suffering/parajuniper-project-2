import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './Searchbar.scss';
import Select from 'react-select'

const options = [
    { value: 'id', label: 'id' },
    { value: 'firstName', label: 'firstName' },
    { value: 'lastName', label: 'lastName' }
  ]

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [
                { type: "firstName", value: "John", text: "firstName: John", id: "firstName: John"},
                { type: "lastName", value: "Doe", text: "lastName: Doe",  id: "lastName: Doe" }
             ],
            suggestions: [
                { type: "firstName", value: "John", text: "firstName: John" },
             ],
            field: [{ value: 'firstName', label: 'firstName' }]
            
        };
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e) {
        this.setState({ field: [e] });
      }
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
        this.props.onInputChange(this.state.tags)
    }

    handleAddition(tag) {
        
        tag.value = tag.text
        tag.text = this.state.field[0].value + ': ' + tag.text
        tag.type = this.state.field[0].value
        tag.id = tag.text
        // console.log('handle add tags: ' + String(this.state.tags))
        this.props.onInputChange(this.state.tags)
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div className='search_wrapper'>
                <Select 
                options={options} 
                placeholder= 'Pick field'
                value={this.state.field}
                onChange={this.handleFieldChange}
                />
                <ReactTags 
                    tags={tags}
                    suggestions={[]}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    placeholder={"enter field value"}
                    />
                    
            </div>
        )
    }
};