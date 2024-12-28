//api key=RXHCLBHCL43ZN59FYNT5UGWGX
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY
async function getAPIData(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=RXHCLBHCL43ZN59FYNT5UGWGX`
  );
  const data = await response.json();
  return data;
}

function myData(data) {
  const dataObject = {
    description: data.description,
    temp: data.currentConditions.temp,
    feelslike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
  };
  return dataObject;
}

async function main() {
  const getData = await getAPIData("delhi,india");
  const finalData = await myData(getData);
  console.log(finalData); //we now have the data we require


}


main();
