import jwt from "jsonwebtoken";
import { School } from "../models/index.js";

const createSchool = async (req, res) => {
  const school = new School(req.body); 
  try {
    await school.save();
    const token = await school.generateAuthToken(); 
    res.status(201).send({ school, token });
  } catch (e) {
    console.log(e);
    if (e.keyPattern?.email === 1) {
      res.status(400).send({
        error: "Email Already Exists",
      });
    }
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const loginSchool = async (req, res) => {
  try {
    const school = await School.findUsingCredentials(
      req.body.email,
      req.body.password
    );
    console.log(school);
    const token = await school.generateAuthToken(); 
    res.status(200).send({ school, token });
  } catch (e) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

export { createSchool, loginSchool };
