import React from 'react';
import {Form} from 'react-bootstrap';


const Search = ({searchQuery, onChange: setSearchQuery}) => {
    //search component
    return (
        <Form action="/" method="get" autoComplete="off">
            <Form.Control 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
                key="s" />
        </Form>

    )
}

export default Search;