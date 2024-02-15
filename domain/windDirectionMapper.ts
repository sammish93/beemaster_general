/**
 * A function designed to help visualise which direction the wind is coming from via an icon.
 * @param windDirectionAngle A number (can be decimal) greater than or equal to 0 and less than or equal 
 * to 360.
 * @returns Returns a string referring to a specific Material Community Icon based on the value of the 
 * windDirectionAngle value. 
 */
const getWindDirectionIconFromAngle = (windDirectionAngle: number): string => {

    if (windDirectionAngle > 337.5 &&  windDirectionAngle <= 360 
        || windDirectionAngle >= 0 && windDirectionAngle <= 22.5) {
        // Wind from north.
        return "arrow-down-thick";
      } else if (windDirectionAngle > 22.5 && windDirectionAngle <= 67.5) {
        // Wind from north east.
        return "arrow-bottom-left-thick";
      } else if (windDirectionAngle > 67.5 && windDirectionAngle <= 112.5) {
        // Wind from east.
        return "arrow-left-thick";
      } else if (windDirectionAngle > 112.5 && windDirectionAngle <= 157.5) {
        // Wind from south east.
        return "arrow-top-left-thick";
      } else if (windDirectionAngle > 157.5 && windDirectionAngle <= 202.5) {
        // Wind from south.
        return "arrow-up-thick";
      } else if (windDirectionAngle > 202.5 && windDirectionAngle <= 247.5) {
        // Wind from south west.
        return "arrow-top-right-thick";
      } else if (windDirectionAngle > 247.5 && windDirectionAngle <= 292.5) {
        // Wind from west.
        return "arrow-right-thick";
      } else if (windDirectionAngle > 292.5 && windDirectionAngle <= 337.5) {
        // Wind from north west.
        return "arrow-bottom-right-thick";
      } else {
        // 0 > Angle > 360.
        console.error(`'${windDirectionAngle}' is not a valid angle.`)
        throw new Error(`'${windDirectionAngle}' is not a valid angle.`);
      }   
}

export default getWindDirectionIconFromAngle