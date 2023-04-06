


function degreeToRadianConverter(deg: number) {
    return deg * (Math.PI / 180);
  }
  
  export const great_circle_distance = (guestLat: number, compLat: number, guestLon: number, compLon: number) => {
  
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
  