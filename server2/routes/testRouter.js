import express from "express";


const router = express.Router();



router.get("/firstroute", (request, response) => {
    response.send("this is your first information sent by the server");
      });



      export default router;