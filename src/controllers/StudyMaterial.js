import { StudyMaterial } from "../models/index.js";
import mongoose from "mongoose";

const addStudyMaterial = async (req, res) => {
  const studyMaterialId=req.body.studyMaterialId;
  
  // console.log(req.body);
  // console.log("fd");
  try {
    const studyMaterial=await StudyMaterial.findById({_id:studyMaterialId});
    // console.log(studyMaterial);
    req.body.studyMaterial.map((e,i)=>{
      studyMaterial.docArray.push(e);
    })
    // studyMaterial.docArray.push(req.body.studyMaterial);
    studyMaterial.save();
    res.status(201).send("Study Material Added Successfully")
  } catch (e) {
    // console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchStudyMaterial = async (req, res) => {
  try {
    const studyMaterial = await StudyMaterial.find({});
    res.status(200).send(studyMaterial);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addStudyMaterial, fetchStudyMaterial };
