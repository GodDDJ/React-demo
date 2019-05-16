import React from 'react';
import $ from 'jquery';
import './style.css';
class StudentCourse extends React.Component{

    constructor(){
        super();
        //局部状态
        this.state={
            flag:false,
            studentcourse:[],
            students:[],
            courses:[],
            form:{
                chooseTime:"",
                grade:"",
                studentId:"",
                courseId:""
            }
        }
    }

    componentDidMount(){
        //1.加载学生信息
        this.loadStudents();
        //1.加载课程信息
        this.loadCourses();
        //加载选课信息
        this.loadStudentCourse();
    }


    loadStudents(){
        //1.加载学生信息
        $.get("http://127.0.0.1:8888/student/findAll",({status,message,date})=>{
           if(status===200){
               this.setState({
                   "students":date,
                   form:{...this.state.form,...{studentId:date[0].id}}
               })
           }else{
               alert(message)
           }
       })
   }


   loadCourses(){
        //1.加载课程信息
        $.get("http://127.0.0.1:8888/course/findAll",({status,message,date})=>{
           if(status===200){
               //将查询数据库设置到state中
               this.setState({
                   "courses":date,
                   form:{...this.state.form,...{courseId:date[0].id}}
               })
           }else{
               alert(message)
           }
       })
   }


   loadStudentCourse(){
       //1.加载选课信息
       $.get("http://127.0.0.1:8888/studentsc/findAllWith",({status,message,date})=>{
        if(status===200){
            //将查询数据库设置到state中
            this.setState({
                "studentcourse":date
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
    let url="http://127.0.0.1:8888/studentsc/saveOrUpdate";
    $.post(url,this.state.form,({message})=>{
        alert(message)
        //刷新页面
        this.loadStudentCourse();
    })
    event.preventDefault();
}


toUpdate=(id)=>{
    //1,通过id查找课程信息
    //2，将返回结果设置到this.state.form中
    //state->form
    $.get("http://127.0.0.1:8888/studentsc/findById?id="+id,({status,message,date})=>{
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
            chooseTime:"",
            grade:"",
            studentId:"",
            courseId:""
        }
    })
}



toDelete=(id)=>{
    //1,通过id查找课程信息
    //2，将返回结果设置到this.state.form中
    //state->form
    $.get("http://127.0.0.1:8888/studentsc/delete?id="+id,({status,message,date})=>{
        alert(message)
        //刷新页面
        this.loadStudentCourse();
    })
}


    render(){
        let {studentcourse,students,courses,form,flag}=this.state;
        let $form;
        if(flag){
            $form=(
                <form onSubmit={this.submitHandler}>
                选课时间
                <input type="text" name="chooseTime" value={form.chooseTime} onChange={this.changeHandler}/> <br/>
                选课年级
                <input type="text" name="grade" value={form.grade} onChange={this.changeHandler}/> <br/>
                选课学生
                <select name="studentId" value={form.studentId} onChange={this.changeHandler}>
                    {
                    students.map((item)=>{
                        return <option value={item.id} key={item.id}>{item.realname}</option>
                    })
                    }
                </select> <br/>
                选课课程
                <select name="courseId" value={form.courseId} onChange={this.changeHandler}>
                    {
                    courses.map((item)=>{
                        return <option value={item.id} key={item.id}>{item.name}</option>
                    })
                    }
                </select> <br/>
                <input type="submit" value="提交"/>
                </form>
            )
        }
        return(
            <div>
                <h2>选课管理</h2>
                <button onClick={this.toAdd} class="btn btn-primary">添加</button>
                {JSON.stringify(form)}
                {$form}
            <table class="table">
                <thead>
                    <tr>
                    <th>编号</th>
                    <th>选课时间</th>
                    <th>选课年级</th>
                    <th>选课学生</th>
                    <th>选课课程</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    studentcourse.map((item)=>{
                    return (<tr key={item.id}>
                        <td><input type='checkbox' value={item.id}/></td>
                        <td>{item.chooseTime}</td>
                        <td>{item.grade}</td>
                        <td>{item.studentId}</td>
                        <td>{item.courseId}</td>
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
export default StudentCourse;