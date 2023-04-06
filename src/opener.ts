import fs from 'fs';
import { sendToRabbitMQ } from './RabbitMQ.connet';
import { great_circle_distance } from './great_circle_distance';


const FINTECHcoLat = 52.493256;
const FINTECHCOLon = 13.446082;


const letterChecker = (value: string):boolean => {
  const regex = /[a-zA-Z]/;
  return regex.test(value)
}
const customerFinder = () => {
  try {
        fs.readFile('customers.txt', 'utf-8',  async(err, data) => {
          if (err) throw err;
          let customerid: Array<string> = [];
          const lines: Array<string> = data.split('\n');
          
          for (let i = 0; i < lines.length; i ++) {
            const [id, lat, long] = lines[i].split(',');
            const splittedId = id.split(': ');
            const splittedLat = lat.split(': ');
            const splittedLong = long.split(':');

            if (id === '' || lat === '' || long === '' ||  splittedId[1] === '' || splittedLat[1] === '' || splittedLong[1] === '' ||
            (letterChecker(splittedLat[1])) || letterChecker(splittedLong[1])) {
              console.warn(`\nInvalid record encountered !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n`)
              continue;
            }
            
            
            const returnedDistance: any = great_circle_distance(parseFloat(splittedLat[1]), FINTECHcoLat, parseFloat(splittedLong[1]), FINTECHCOLon);
            if (returnedDistance <= 100) {
              customerid.push(splittedId[1]);
            }
          }
          
          const sortedCustomerid = customerid.sort();
          
          for (let i: number = 0; i < sortedCustomerid.length; i++) {
            sendToRabbitMQ(customerid[i]);
          }
        })

      }
catch (error: any) {
  console.log(error);
}
}

customerFinder()


