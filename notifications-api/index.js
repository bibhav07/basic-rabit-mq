const express = require("express");
const amqp = require("amqplib");
const app = express();

const amqpUrl = "amqp://localhost:5672";

app.get("/", async (req, res) => {
  res.send("NOTIFCATIONS API")
});


(async function connect(){
  try {
    const conn = await amqp.connect(amqpUrl);
    const channel = await conn.createChannel();
    await channel.assertQueue("order.shipped");
  
    channel.consume("order.shipped", (message) => {
      console.log("--RECIVED--");
      console.log(message.content.toString());
      channel.ack(message);
    })
  } catch (error) {
    console.log(error);
  }
})();





app.listen(8001, () => {
  console.log("Listening on PORT 8001");
});