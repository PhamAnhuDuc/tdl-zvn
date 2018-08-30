import React, { Component } from 'react';

import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter,includes,orderBy as funcOrderBy,remove, reject} from 'lodash';

import tasks from './mocks/task';

const uuidv1 = require('uuid/v4');
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : [],
            isShowForm : false,
            strSearch : '',
            orderBy: 'name',
            orderDir:'asc',
            itemSelected: null
        }
        this.handleTogoForm = this.handleTogoForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleSort(orderBy,orderDir){
        this.setState({
            orderBy:orderBy,
            orderDir:orderDir
        });
    }


    handleTogoForm(){
        this.setState({
            isShowForm : !this.state.isShowForm,
            itemSelected: null
        });
    }

    //search
    handleSearch(value){
        this.setState({
            strSearch : value
        });
    }
   
    //delete 
    handleDelete(id){
        let items = this.state.items;
        remove(items,(item)=>{
            return item.id === id;
        });
        this.setState({
            items : items //thực hiện xong thì gán lại cho nó
        });
        localStorage.setItem('task', JSON.stringify(items));

    }  
    //thêm mới (Add)
    handleSubmit(item){
        let items = this.state.items;

        if(item.id !== ''){ // trường hợp edit (nó được gửi sang từ bên form)
            items = reject(items, {id:item.id});
            items.push({
                id : item.id,
                name: item.name,
                lever : +item.lever
            });



            // items.forEach((elm,key)=>{
            //     if(elm.id === item.id){
            //         items[key].name = item.name;
            //         items[key].lever = +item.lever;
            //     }
            // });
        }else { // trường hợp add
            items.push(
                {
                    id : uuidv1(),
                    name : item.name,
                    lever: +item.lever //ép về kiểu số
                }
            );
        }
        
        this.setState({ //cập nhập lại
            items:items,
            isShowForm:false
        });
        localStorage.setItem('task', JSON.stringify(items));
    } 
    //edit
    handleEdit(item){
        this.setState({
            itemSelected : item,
            isShowForm : true
        });
        
    }
    UNSAFE_componentWillMount(){
        let items = JSON.parse(localStorage.getItem('task'));
        this.setState({
           items:items
        });
        //lưu vào localStorage
        localStorage.setItem("task", JSON.stringify(this.state.items));

    }
    render() {
        //console.log("app: ", this.state.orderBy + "-" + this.state.orderDir);
        let itemsOrigin = [...this.state.items]; //coppy vào để nó k thay đổi
        let items = [];
        let isShowForm = this.state.isShowForm;
        let elmForm = null;
        const search = this.state.strSearch;
        let {orderDir,orderBy,itemSelected} = this.state;

        //tìm kiếm
        items= filter(itemsOrigin,(item) =>{ 
            return includes(item.name.toLowerCase(), search.toLowerCase());
        });
        // if(search.length > 0){
        //     itemsOrigin.forEach((item)=>{
        //         if(item.name.toLocaleLowerCase().indexOf(search) !== -1){ //nếu có // thực hiện tìm kiếm
        //             items.push(item);
        //         }
        //     })
        // }else{
        //     items = itemsOrigin;
        // }
        
        //sắp xếp
        items= funcOrderBy(items, [orderBy],[orderDir]);

        if(isShowForm){
            elmForm = <Form onClickSubmit={this.handleSubmit} itemSelected={itemSelected}/>;
        }
        return (
            <div >
                <div className="container">
                    {/* TITLE : START */}
                    <Title/>
                    {/* TITLE : END */}

                    {/* CONTROL (SEARCH + SORT + ADD) : START */}
                    <Control 
                        onClickAdd={this.handleTogoForm}  
                        isShowForm={isShowForm}
                        onClickSearchGo = {this.handleSearch}
                        orderBy = {orderBy}
                        orderDir = {orderDir}
                        onClickSort = {this.handleSort}
                    />
                    {/* CONTROL (SEARCH + SORT + ADD) : END */}
                    {/* FORM : START */}
                        {elmForm}
                    {/* FORM : END */}
                    <List items={items} onClickDelete = {this.handleDelete} onClickEdit = {this.handleEdit}/>
                    {/* LIST : START */}
                </div>
            </div>

        );
    }
}

export default App;
