import React from 'react';
import $ from 'jquery';
import './style.css';
class Teacher extends React.Component{

    
    constructor(){
        super();
        //局部状态
        this.state={
            flag:false,
            students:[],
            form:{
                realname:"",
                gender:"",
                username:"",
                password:"",
                type:"",
                status:""
            }
        }
    }


    componentDidMount(){
        //1.加载学生信息
        this.loadTeachers();
    }


    loadTeachers(){
         //1.加载课程信息
         $.get("http://127.0.0.1:8888/teacher/findAll",({status,message,date})=>{
            if(status===200){
                //将查询数据库设置到state中
                this.setState({
                    "students":date
                })
            }else{
                alert(message)
            }
        })
    }


    changeHandler=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:value}}
        })
    }

    submitHandler=(event)=>{
        let url="http://127.0.0.1:8888/teacher/saveOrUpdate";
        $.post(url,this.state.form,({message})=>{
            alert(message)
            //刷新页面
            this.loadTeachers();
        })
        event.preventDefault();
    }


    toUpdate=(id)=>{
        //1,通过id查找课程信息
        //2，将返回结果设置到this.state.form中
        //state->form
        $.get("http://127.0.0.1:8888/teacher/findById?id="+id,({status,message,date})=>{
            if(status===200){
                //将查询数据库设置到state中
                this.setState({
                    "form":date
                })
            }else{
                alert(message)
            }
        })
    }


    toAdd=()=>{
        this.setState({
            flag:!this.state.flag,
            form:{
                realname:"",
                gender:"",
                username:"",
                password:"",
                type:"",
                status:""
            }
        })
    }


    toDelete=(id)=>{
        //1,通过id查找课程信息
        //2，将返回结果设置到this.state.form中
        //state->form
        $.get("http://127.0.0.1:8888/teacher/delete?id="+id,({status,message,date})=>{
            alert(message)
            //刷新页面
            this.loadTeachers();
        })
    }


    render(){
        let {students,form,flag}=this.state;

        let $form;
        if(flag){
            $form=(
                <form onSubmit={this.submitHandler}>
                姓名
                <input type="text" name="realname" value={form.realname} onChange={this.changeHandler}/> <br/>
                性别
                <input type="text" name="gender" value={form.gender} onChange={this.changeHandler}/> <br/>
                名称
                <input type="text" name="username" value={form.username} onChange={this.changeHandler}/> <br/>
                密码
                <input type="text" name="password" value={form.password} onChange={this.changeHandler}/> <br/>
                类型
                <input type="text" name="type" value={form.type} onChange={this.changeHandler}/> <br/>
                状态
                <input type="text" name="status" value={form.status} onChange={this.changeHandler}/> <br/>
                <input type="submit" value="提交"/>
                </form>
            )
        }

        return(
            <div>
                <h2>教师管理</h2>
                <button onClick={this.toAdd} class="btn btn-primary">添加</button>
                {JSON.stringify(form)}
                {$form}
            <table class="table">
                <thead>
                    <tr>
                    <th>编号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>名称</th>
                    <th>密码</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    students.map((item)=>{
                    return (<tr key={item.id}>
                        <td><input type='checkbox' value={item.id}/></td>
                        <td>{item.realname}</td>
                        <td>{item.gender}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>
                        <span onClick={this.toDelete.bind(this,item.id)}>删除</span>
                        <span onClick={this.toUpdate.bind(this,item.id)}>更新</span>
                        </td>
                    </tr>);
                    })
                    }
                </tbody>
        </table>
            </div>
        )
    }
}
export default Teacher;