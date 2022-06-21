import { School, Teacher } from "../models/index.js";
import { Class } from "../models/index.js";
import { StudyMaterial } from "../models/index.js"; 
import {generatePassword} from '../util/generatepassword.js'

// const mongoose = require('mongoose');
const addSubjectTeachers = async (req, res) => {
  const subjectTeachers = req.body.subjectTeachers;
  console.log(subjectTeachers);
  const subjectTitles = [];
  subjectTeachers.map((e, i) => {
    console.log(e.subject);
    const temp = new StudyMaterial({ subjectTitle: e.subject });
    subjectTitles.push(temp);
  });
  const classid = req.body.classid;
  try {
    const _class = await Class.findById(classid).then(async (__class) => {
      // console.log(_class)
      // console.log(_class.teachers)
      // console.log(subjectTeachers)
      for (var i = 0; i < subjectTeachers.length; i++) {
        __class.teachers.push(subjectTeachers[i]);
      }

      subjectTitles.map(async (e, i) => {
        __class.studyMaterialId.push(e._id);
        await e.save();
      });
      console.log(__class);
      await __class.save();
      // console.log(classid);
      // console.log(subjectTitles)
      res.status(201).send({ message: "Subject Teachers Added Successfully" });
    });
    // _class.teachers.push(subjectTeachers);

    //   subjectTitles.map(async(e,i)=>{
    //     _class.studyMaterialId.push(e._id);
    //     await e.save();
    //   })
    //   await _class.save();
    // console.log(classid);
    // console.log(subjectTitles)
    // res.status(201).send({ message: "Subject Teachers Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error While Adding Subject Teachers" });
  }
};

const addTeacher=async(req,res)=>{
  var password = generatePassword();  
  req.password=password;
  const teacher = new Teacher(req);

  try {
    await teacher.save(); 

    const school = await School.findOne({ _id: req.schoolId });
    school.teachers.push(teacher._id);
    await school.save(); 
    
    return {status:201,message:{teacher:req}};
  } catch (e) {
    // console.log(e);
    if (e.keyPattern?.email === 1) {
      return {status: 400,message: `Email already exists for ${req.name}`}
    }
    return {status:500,message:"Internal Server Error" }
  }
}

const addTeachers = async (req, res) => {
  
  const temp = req.body.teachers;
  var promises = temp.map(async (e, i) => {
    e.schoolId=req.school._id; 
    
    return addTeacher(e, res);
  })

  Promise.all(promises).then( (results)=> {
    var response = []
    for (var i = 0; i < results.length; i++) {
      var e = results[i]
      if (e.status != 201) {
        res.status(e.status).send({ error: e.message });
        return;
      }
      else {
        console.log("hello")
        // console.log(e.message.student);
        response.push(e.message.teacher);
      }
    }
    // console.log(response);
    res.status(201).send({ message: "Added Successfully", teachers: response });
  })
}

//const createTeacher = async (req, res) => {
//  const teacher = new Teacher({ ...req.body, schoolId: req?.school?._id });
//
//  try {
//    await teacher.save();
//    const token = await teacher.generateAuthToken();
//    const school = await School.findById(req.school._id).then(async (_school) => {
//      _school.teachers.push(teacher._id);
//      await _school.save();
//    } );
//    res.status(201).send({ teacher });
//  } catch (e) {
//    console.log(e);
//    if (e.keyPattern?.email === 1) {
//      res.status(400).send({
//        error: "Email Already Exists",
//      });
//    }
//    res.status(500).send({ error: "Internal Server Error" });
//  }
//};

const loginTeacher = async (req, res) => {
  console.log("logging in");
  try {
    const teacher = await Teacher.findUsingCredentials(
      req.body.email,
      req.body.password
    );
    const token = await teacher.generateAuthToken();
    res.status(200).send({ teacher, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

export { addTeachers, loginTeacher, addSubjectTeachers };
