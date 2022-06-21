import { Feedback } from "../models/index.js";

const addFeedback = async (req, res) => {
  //school gives feedback to us
  //teacher -> school or us
  //student -> teacher or school or us
  console.log(req.student._id);
  const obj = {
    from: {
      from: req.body.from,
      student: req.body.from == "student" ? req.student._id : null,
      teacher: req.body.from == "teacher" ? req.teacher._id : null,
      school: req.body.from == "school" ? req.school._id : null,
    },
    to: {
      to: req.body.to,
      us: req.body.to == "us" ? true : false,
      teacher: req.body.to == "teacher" ? req.body.teacherId : null,
      school: req.body.to == "school" ? req.body.schoolId : null,
    },
    issue: req.body.issue,
  };
  const feedback = new Feedback(obj);
  try {
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const replyFeedback = async (req, res) => { 
  try {
    const feedback = await Feedback.findOne({ _id: req.body.feedbackId }); 
    feedback.reply = req.body.reply;
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchFeedback = async (req, res) => {
  try {
    const feedbacks = [];
    if (req.student) {
      const temp = await Feedback.find({
        'from.student': req.student._id, 
      });

      feedbacks.push(temp);
    }

    if (req.teacher) {
      const temp = await Feedback.find({
        'from.teacher': req.teacher._id,
      });
      feedbacks.push(temp);

      const temp2 = await Feedback.find({
        'to.teacher': req.teacher._id,
      });
      feedbacks.push(temp2);
    }

    if (req.school) {
      const temp = await Feedback.find({
        'from.school': req.school._id,
      });
      console.log(temp);
      feedbacks.push(temp);

      const temp2 = await Feedback.find({
        'to.school': req.school._id, 
      });
      feedbacks.push(temp2);
    }

    res.status(200).send(feedbacks);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addFeedback, replyFeedback, fetchFeedback };
