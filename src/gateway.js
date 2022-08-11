const url = 'https://api.weatherbit.io/v2.0/';
const apiKey = process.env.REACT_APP_KEY;

export const fetchCity = city => {
  return fetch(`${url}/current?key=${apiKey}&city=${city}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(response => {
      const { city_name, lon, lat, weather, temp } = response.data[0];

      return {
        cityName: city_name,
        lon,
        lat,
        temp,
        description: weather.description,
        icon: weather.icon,
      };
    })
    .catch(() => {
      alert('no such city found...');
      return null;
    });
};

export const fetchCities = cities => {
  return fetch(`${url}/current?key=${apiKey}&points=${cities}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(response => {
      return response.data.map(({ city_name, lon, lat, weather, temp }) => {
        return {
          cityName: city_name,
          lon,
          lat,
          temp,
          description: weather.description,
          icon: weather.icon,
        };
      });
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      return [];
    });
};
