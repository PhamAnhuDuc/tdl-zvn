import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
    constructor(props){
        super(props);
        this.handleAdd =this.handleAdd.bind(this);
    }

    handleAdd(){
        this.props.onClickAdd(); 
    }
    render() {
        let {orderDir,orderBy} = this.props;
        let elmButton =  <button type="button" className="btn btn-info btn-block" onClick={this.handleAdd}>Add Task</button>;
        if(this.props.isShowForm === true){
            elmButton = <button type="button" className="btn btn-success btn-block" onClick={this.handleAdd}>Close Form</button>;
        }
        return (
            <div className="row">
                {/* SEARCH : START */}
                <Search onClickGo={this.props.onClickSearchGo}/>
                {/* SEARCH : END */}
                {/* SORT : START */}
                <Sort   
                    orderBy = {orderBy}
                    orderDir = {orderDir}
                    onClickSort ={this.props.onClickSort}
                />
                {/* SORT : END */}
                {/* ADD : START */}
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    {elmButton}
                </div>
                {/* ADD : END */}
            </div>
        );
    }
}

export default Control;
