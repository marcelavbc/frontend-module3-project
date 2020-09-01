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
            <div className="">
                <form className="" autoComplete="new-search">
                    <input
                        autoComplete="off"
                        type="text"
                        name="search"
                        onChange={this.handleSearch} />
                </form>
            </div>
        )
    }
}
