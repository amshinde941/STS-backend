import express from "express";
import { schoolAuth } from "../middleware";
import { allNotices, addNotice, createSchool, addTeachers, loginSchool, addFeedback, fetchFeedback, addClass, addEvent, replyFeedback } from "../controllers";
import { School } from "../models";

const SchoolRouter = express.Router();
//Add auth controllers @amit purohit
SchoolRouter.post("/signup", createSchool);
SchoolRouter.post("/login", loginSchool);
SchoolRouter.post("/addteachers", schoolAuth, addTeachers);
SchoolRouter.post("/addclass", schoolAuth, addClass);

SchoolRouter.get("/notice", schoolAuth, allNotices);
SchoolRouter.post("/notice", schoolAuth, addNotice);

SchoolRouter.post("/feedback", schoolAuth, addFeedback);
SchoolRouter.put("/feedback", schoolAuth, replyFeedback);
SchoolRouter.get("/feedback", schoolAuth, fetchFeedback);

SchoolRouter.post("/event", schoolAuth, addEvent);

export { SchoolRouter };
