import { Diary } from "../models/index.js";

const addDiary = async (req, res) => {
    //diary already created at time of addstudents.
  try {
    const diary = Diary.findOne({
      _id: req.body.diaryId,
    });
    diary.diaryArray.push({
      message: req.body.message,
      author: {
        student: req.student ? req.student._id : null,
        teacher: req.teacher ? req.teacher._id : null,
      },
    });
    await diary.save();
    res.status(200).send(diary);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchDiary = async (req, res) => {
  try {
    const diaries = await Diary.find({ _id: req.student._id });
    res.status(200).send(diaries);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addDiary, fetchDiary };
