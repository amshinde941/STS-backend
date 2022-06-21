import express from "express";
import { studentAuth } from "../middleware";
import { loginStudent, fetchClass, addFeedback, fetchFeedback, allNotices, addDiary, fetchDiary, addAchievement } from "../controllers";  

const StudentRouter = express.Router();

//StudentRouter.post("/signup", createStudent);

StudentRouter.post("/login", loginStudent);

StudentRouter.get("/class", studentAuth, fetchClass);

StudentRouter.post("/feedback", studentAuth, addFeedback);
StudentRouter.get("/feedback", studentAuth, fetchFeedback);

StudentRouter.get("/notice", studentAuth, allNotices);

//diary should be created at the time of adding subj teacher.
StudentRouter.put("/addmessageindiary", studentAuth, addDiary);
StudentRouter.get("/diary", studentAuth, fetchDiary);

StudentRouter.post("/achievement", studentAuth, addAchievement);
export { StudentRouter };
