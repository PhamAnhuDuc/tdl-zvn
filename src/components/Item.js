import React, { Component } from 'react';

    
class Item extends Component {
    constructor(props){
        super(props);
    }
    handleDelete(id){
        this.props.onClickDelete(id);
    }
    handleEdit(item){
        console.log(item);
        this.props.onClickEdit(item);
        
    }
    render() {
        let item = this.props.item;
        let index = this.props.index;

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">{this.showElementLever(item.lever)}</td>
                <td>
                    <button onClick={()=>this.handleEdit(item)} type="button" className="btn btn-warning">Edit</button>
                    <button  onClick={()=>this.handleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );

        
    }
    showElementLever(lever){
            
        let elmLever = <span className="label label-default">Small</span>;
        if(lever === 1){
            elmLever = <span className="label label-success">Medium</span>;
        }else if(lever === 2){
            elmLever = <span className="label label-danger">Medium</span>;
        }
        return elmLever;
    }
}

export default Item;
