import * as express from "express";
const db= require('../db');

export const pingController = express.Router();

pingController.get('/hello', (_, res) => {
  res.status(200).json({
    greetings: 'Thank you for spending some time on this test. All the best 🙌'
  });
});

pingController.get('/', (_, res) => {
  res.status(200).json({
    welcome: 'Welcome to the page'
  });

});

pingController.get('/getcarerecipients', async(_, res) => {
  try {
    let result = await db.getcarerecipients();
    res.json(result);
    
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
    
  }

});

pingController.get('/getdataforcarerecipientid', async(req, res) => {
  try {
    let cr_id = req.query.cr_id;
    let result = await db.getdataforcarerecipientid(cr_id);
    res.json(result);
    
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
    
  }
});

pingController.get('/getdataforcarerecipientidandevent', async(req, res) => {
  try {
    let cr_id = req.query.cr_id;
    let event_type = req.query.event_type;
    let result = await db.getdataforcarerecipientidandevent(cr_id, event_type);
    res.json(result);
    
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
