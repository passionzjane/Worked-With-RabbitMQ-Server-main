import fs from 'fs';
import { sendToRabbitMQ } from './RabbitMQ.connet';



const FINTECHcoLat = 52.493256;
const FINTECHCOLon = 13.446082;

function degreeToRadianConverter(deg: number) {
  return deg * (Math.PI / 180);
}

const great_circle_distance = (guestLat: number, compLat: number, guestLon: number, compLon: number) => {

      const changeInLat = degreeToRadianConverter(compLat - guestLat)
      const changeInLong = degreeToRadianConverter(compLon - guestLon)
  
  
      const changeInLatSine = Math.sin(changeInLat/2);
      const changeInLongSine = Math.sin(changeInLong/2);
      const param1 = (changeInLatSine** 2) + Math.cos(degreeToRadianConverter(guestLat)) 
      * Math.cos(degreeToRadianConverter(compLat)) * (changeInLongSine**2);
      const param2 = 2 * Math.atan2(Math.sqrt(param1), Math.sqrt(1-param1));
      const distance = 6371 * param2;
      return distance;
}

        
const customerFinder = () => {
  try {
        fs.readFile('customer.csv', 'utf-8',  async(err, data) => {
          if (err) throw err;
          
          let customerid = [];
          const lines = data.split('\n');
          for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split(',');
            if (!columns[2] || !columns[0] || !columns[1]) {
              console.warn('Invalid record supplied');
              continue;
            }
            
            const guestLon: number = parseInt(columns[1]);
            const guestLat: number = parseInt(columns[2]);
            const returnedDistance: any = great_circle_distance(guestLat, FINTECHcoLat, guestLon, FINTECHCOLon);
            if (returnedDistance >= 100) {
              customerid.push(columns[0]);
            }
          }
          
          customerid = customerid.sort();
          console.log(customerid)
          for(let i = 0; i< customerid.length; i++) {
            sendToRabbitMQ(customerid[i])
          }
          // customerid.forEach((guestId: string) => {
          //   sendToRabbitMQ(guestId);
          // })
      })
}
catch (error: any) {
  console.log(error);
}
}

customerFinder()


