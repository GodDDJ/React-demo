import React from 'react';
import $ from 'jquery';
import './style.css';
class Course extends React.Component{

    constructor(){
        super();
        //局部状态
        this.state={
            flag:false,
            teachers:[],
            courses:[],
            form:{
                name:"",
                credit:"",
                description:"",
                teacherId:""
            }
        }
    }


    componentDidMount(){
        //1.加载教师信息
        this.loadTeachers();
        //1.加载课程信息
        this.loadCourses();
    }


    loadTeachers(){
         //1.加载教师信息
         $.get("http://127.0.0.1:8888/teacher/findAll",({status,message,date})=>{
            if(status===200){
                this.setState({
                    "teachers":date,
                    form:{...this.state.form,...{teacherId:date[0].id}}
                })
            }else{
                alert(message)
            }
        })
    }


    loadCourses(){
         //1.加载课程信息
         $.get("http://127.0.0.1:8888/course/findAllWithTeacher",({status,message,date})=>{
            if(status===200){
                //将查询数据库设置到state中
                this.setState({
                    "courses":date
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
        let url="http://127.0.0.1:8888/course/saveOrUpdate";
        $.post(url,this.state.form,({message})=>{
            alert(message)
            //刷新页面
            this.loadCourses();
        })
        event.preventDefault();
    }


    toUpdate=(id)=>{
        //1,通过id查找课程信息
        //2，将返回结果设置到this.state.form中
        //state->form
        $.get("http://127.0.0.1:8888/course/findById?id="+id,({status,message,date})=>{
            if(status===200){
                //将查询数据库设置到state中
                this.setState({
                    "form":date
                })
                this.loadCourses();
            }else{
                alert(message)
            }
        })
    }


    toAdd=()=>{
        this.setState({
            flag:!this.state.flag,
            form:{
                name:"",
                credit:"",
                description:"",
                teacherId:""
            }
        })
    }


    toDelete=(id)=>{
        //1,通过id查找课程信息
        //2，将返回结果设置到this.state.form中
        //state->form
        $.get("http://127.0.0.1:8888/course/delete?id="+id,({status,message,date})=>{
            alert(message)
            //刷新页面
            this.loadCourses();
        })
    }


    render(){
        let {teachers,courses,form,flag}=this.state;

        let $form;
        if(flag){
            $form=(
                <form onSubmit={this.submitHandler}>
                课程名称
                <input type="text" name="name" value={form.name} onChange={this.changeHandler}/> <br/>
                课程学分
                <input type="text" name="credit" value={form.credit} onChange={this.changeHandler}/> <br/>
                课程简介
                <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea> <br/>
                任课老师
                <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}>
                    {
                    teachers.map((item)=>{
                        return <option value={item.id} key={item.id}>{item.realname}</option>
                    })
                    }
                </select> <br/>
                <input type="submit" value="提交"/>
                </form>
            )
        }

        return(
            <div>
                <h2>课程管理</h2>
                <button onClick={this.toAdd} class="btn btn-primary">添加</button>
                {JSON.stringify(form)}
                {$form}
            <table class="table">
                <thead>
                    <tr>
                    <th>编号</th>
                    <th>课程名称</th>
                    <th>课程学分</th>
                    <th>课程介绍</th>
                    <th>任课老师</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    courses.map((item)=>{
                    return (<tr key={item.id}>
                        <td><input type='checkbox' value={item.id}/></td>
                        <td>{item.name}</td>
                        <td>{item.credit}</td>
                        <td>{item.description}</td>
                        <td>{item.teacherId}</td>
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
export default Course;


