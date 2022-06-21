import { Mark } from "../models/index.js";
import { Class } from "../models/index.js";
const addMark=async(req,res) => {
    const mark = new Mark(req.body.marks);
    const classid=req.body.classid;
      try {
        await mark.save();
        const _class = await Class.findById({_id:classid});
        _class.markArr.push(mark._id);
        _class.save();
        res.status(201).send(mark);
      } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
      }
};

const allMark= async (req, res) => {
    console.log("All Marks")
    try {
        const marks = await Mark.find({});
        res.status(200).send(marks);
      } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
      }
}

export { addMark , allMark};
