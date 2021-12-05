import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './TagSearch.scss';
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

export class TagSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = props.handleDelete
        this.handleAddition = props.handleAddition
        this.state = {
            suggestions: [
                { type: "firstName", value: "John", text: "firstName: John" },
             ],
            field: props.field,
            tags: props.tags,

        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(e) {
        this.setState({ field: [e] });
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
                <ReactTags 
                    className='tag-search input-group'
                    tags={tags}
                    suggestions={[]}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    placeholder={"enter field value"}
                    inputFieldPosition="bottom"
                />
                <div>
                <Select
                className="child-div" 
                options={options} 
                placeholder= 'Pick field'
                value={this.state.field}
                onChange={this.handleFieldChange}
                />
                <button 
                className="search-button child-div"
                onClick={this.props.handlePatientListSearch}
                > Search </button>
                </div>

            </div>
        )
    }
};  