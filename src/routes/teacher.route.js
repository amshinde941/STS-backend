import express from "express";
import { teacherAuth } from "../middleware";
import { 
  loginTeacher,
  fetchClass,
  fetchallClasses,
  addSubjectTeachers,
  fetchStudyMaterial,
  addStudyMaterial,
  addNotice,
  allNotices,
  addMark,
  allMark,
  addAttendence,
  addStudents,
  addClass,
  addEvent,
} from "../controllers";
import { Teacher } from "../models";

const TeacherRouter = express.Router();
//Add auth controllers @mayur sarode
// TeacherRouter.post("/signup", createTeacher);
TeacherRouter.post("/addSubjectTeachers",teacherAuth, addSubjectTeachers);
TeacherRouter.post("/addStudyMaterial",teacherAuth, addStudyMaterial);
TeacherRouter.post("/addNotice",teacherAuth, addNotice);
TeacherRouter.post("/allNotices",teacherAuth, allNotices);
TeacherRouter.post("/addMark",teacherAuth, addMark);
// Below Route Will Not Required
// TeacherRouter.get("/allMark", allMark);

TeacherRouter.post("/addAttendence",teacherAuth, addAttendence); 
TeacherRouter.post("/addStudents",teacherAuth ,addStudents); 

TeacherRouter.post("/login", loginTeacher);
TeacherRouter.post("/class",teacherAuth, fetchClass);
TeacherRouter.get("/allClasses",teacherAuth, fetchallClasses);
TeacherRouter.post("/event", teacherAuth, addEvent);

export { TeacherRouter };
