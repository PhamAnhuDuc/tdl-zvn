import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            strSearch: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSearch(){
        this.props.onClickGo(this.state.strSearch);
    }
    handleClear(){
        this.setState({strSearch :''});
        this.props.onClickGo('');
    }
    handleChange(event){
        this.setState({strSearch: event.target.value});
    }

    render() {
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="input-group">
                    <input type="text" value={this.state.strSearch} onChange={this.handleChange} className="form-control"  placeholder="Search for..." />
                    <span className="input-group-btn">
                        <button className="btn btn-info" type="button" onClick ={()=>this.handleSearch()}>Go!</button>
                        <button className="btn btn-warning" type="button" onClick ={()=>this.handleClear()}>Clear!</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default Search;
