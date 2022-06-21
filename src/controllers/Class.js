import { Class, School, Teacher } from "../models/index.js";

const addClass = async (req, res) => {
  try {
    const classTeacher = await Teacher.findOne({ _id: req.body.classTeacherId });
    if(!classTeacher){
      res.status(404).send({error: "class teacher not found"});
    }else if(classTeacher.classTeacherOf){
      res.status(404).send({error: "teacher is already a class teacher"});
    }

    const body = {
      className: req.body.className,
      classTeacherId: classTeacher._id,
    };
    const _class = new Class(body);
    await _class.save();

    classTeacher.classTeacherOf = _class._id;
    await classTeacher.save();

    const school = await School.findById(req.school._id);
    school.classes.push(_class);
    await school.save();

    res.status(201).send(_class);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchallClasses = async (req, res) => {
  console.log("HelloAll");
  try {
    const _class = await Class.find({})
      .populate("teachers")
      .populate("students")
      .populate("studyMaterialId")
      .populate("markArr");
    res.status(200).send(_class);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchClass = async (req, res) => {
  try {
    const _class = await Class.findOne({
      _id: req.body.classId,
    })
      .populate("classTeacherId")
      .populate("teachers")
      .populate("students")
      .populate("studyMaterialId")
      .populate("markArr")
      .populate("events");
    res.status(200).send(_class);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addClass, fetchClass, fetchallClasses };
