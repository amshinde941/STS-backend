import { Notification } from "../models/index.js";
 
const addNotification=async (req, res) => {
    const notification = new Notification(req.body);
    try{
        await notification.save();
        res.status(201).send(notification);
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
}
const allNotifications = async (req, res) => {
    try{
        const notifications=await Notification.find({});
        res.status(200).send(notifications)
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
 
}


export {addNotification,allNotifications};