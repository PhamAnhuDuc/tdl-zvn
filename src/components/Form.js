import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_id:'',
            task_name: '',
            task_lever: 0
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCancel() {
        this.props.onClickCancel();

    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        let item = {
            id : this.state.task_id,
            name: this.state.task_name,
            lever:this.state.task_lever
        }
        this.props.onClickSubmit(item);
        event.preventDefault();
    }
    UNSAFE_componentWillMount(){
        //edit
        let item = this.props.itemSelected;
        if(item !== null){ //khi khac  rong thi cap nhap lai
            this.setState({
                task_id:item.id,
                task_name: item.name,
                task_lever: item.lever  
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        //edit
        let item = nextProps.itemSelected;
        if(nextProps !== null){ //khi khac  rong thi cap nhap lai
            this.setState({
                task_id:item.id,
                task_name: item.name,
                task_lever: item.lever  
            });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-offset-7 col-md-5">
                    <form onSubmit={this.handleSubmit} className="form-inline">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="true">label</label>
                            <input name="task_name" 
                                    onChange={this.handleChange} 
                                    value={this.state.task_name}
                                    type="text" className="form-control" placeholder="Task Name" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="true">label</label>
                            <select name="task_lever"
                                onChange={this.handleChange}
                                value={this.state.lever}
                                className="form-control" required="required">
                                Small
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-default" onClick={() => this.handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
