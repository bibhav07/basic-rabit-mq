const express = require("express")
//AMQP (Advanced Message Queuing Protocol) servers. AMQP is a messaging protocol that enables communication between different components in a distributed system.
const amqp = require("amqplib");
const app = express();

const amqpUrl = "amqp://localhost:5672"

app.get('/', async (req, res) => {
   try {
    const conn = await amqp.connect(amqpUrl);
    const channel = await conn.createChannel();
    await channel.assertQueue("order.shipped");
    channel.sendToQueue("order.shipped", Buffer.from(JSON.stringify({name:'viratMe', id:18, phone: '18 07 45'})))
    res.send("ORDERS API");

   } catch (error) {
        console.log(error);
   }
})

app.listen(8000, () => {
    console.log("ORDERS API listening on port 8000")
})