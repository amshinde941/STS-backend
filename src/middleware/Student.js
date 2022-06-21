import jwt from "jsonwebtoken";
import { Student } from "../models/index.js";

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const student = await Student.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!student) {
      throw new Error();
    }

    req.student = student;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Student Authentication Failed" });
  }
};

export  {studentAuth};
