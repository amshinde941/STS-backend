import { Event, Class } from "../models/index.js";

const addEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    const _class = Class.findOne({ _id: req.body.classId });
    _class.events.push(event._id);
    await _class.save();

    res.status(201).send(event);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addEvent };
