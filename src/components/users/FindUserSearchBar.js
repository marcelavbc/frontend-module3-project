import React, { Component } from 'react'

export default class FindUserSearchBar extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(event) {
        this.props.functionToFilter(event.target.value)
    }
    render() {
        return (
            <div className="mb-2 mt-5">
                <form className="" autoComplete="new-search">
                    <input
                        className="input-search-user mb-3 w-50"
                        autoComplete="off"
                        type="text"
                        name="search"
                        placeholder="Search a chef"
                        onChange={this.handleSearch} />
                </form>
            </div>
            
        )
    }
}
