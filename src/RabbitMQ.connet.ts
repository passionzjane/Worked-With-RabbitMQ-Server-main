import { Connection, Channel } from 'amqplib';
import { CONNECT_STRING } from './configuration/configuration';
const amqp = require('amqplib');


console.log(CONNECT_STRING);
export const sendToRabbitMQ = async(message: string): Promise<void> => {
  try {
    
    
    const connection: Connection = await amqp.connect(CONNECT_STRING);
    const channel: Channel = await connection.createChannel();
    const queueName: string = 'Qualified_Customers';
    
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
    
    console.log(message)
    
    await channel.close();
    await connection.close();
  } catch (error: any) {
    console.error(error);
  }
}



