import { Message, Connection, Channel } from 'amqplib';
import { CONNECT_STRING } from './configuration/configuration';
const amqp = require('amqplib');


async function displayMessage() {
try {
    const connection: Connection = await amqp.connect(CONNECT_STRING);
    const channel: Channel = await connection.createChannel();
  
    const queueName: string = 'Qualified_Customers';
  
    const queue = await channel.assertQueue(queueName, { durable: true });
    

    if(queue.messageCount === 0) {
      console.log('You have no eligible customer in the queue, please add some.')
      await channel.close()
      await connection.close()
      return
    }
  
    console.log(`Customers eligible for invitations are`);
  
    await channel.consume(queueName, (message: Message | null) => {
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

