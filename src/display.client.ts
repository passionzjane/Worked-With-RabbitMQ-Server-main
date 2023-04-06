import { Message, Connection, Channel, Replies } from 'amqplib';
import { CONNECT_STRING } from './configuration/configuration';
const amqp = require('amqplib');


async function displayMessage(): Promise<void> {
try {
    const connection: Connection = await amqp.connect(CONNECT_STRING);
    const channel: Channel = await connection.createChannel();
  
    const queueName: string = 'Qualified_Customers';
  
    const queue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true });

    if (queue.messageCount === 0) {
      console.log(`\nThere are currently no eligible guest on the queue !!!!!!!!!!!\n`);
      await channel.close();
      await connection.close();
      return
    }
    

    console.log(`\n Eligible guests obtain from the queue are; \n \n`)
    await channel.consume(queueName, (message: Message | null): void => {
      if (message !== null) {

        console.log(` ${message.content.toString()}`);
        channel.ack(message);
      }
    })
    await channel.close();
    await connection.close();
    ;
} 
catch (error: any) {
  console.log(error);
}
}

displayMessage();
