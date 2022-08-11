import { useEffect, useState } from 'react';
import { fetchCities, fetchCity } from './gateway';
import './styles/app.scss';

const App = () => {
  const [cities, setCities] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const pointsList = JSON.parse(localStorage.getItem('pointsList')) || [];

    if (pointsList.length) {
      fetchCities(pointsList.join(',')).then(citiesList => setCities(citiesList));
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    fetchCity(name).then(cityData => {
      if (!cityData) {
        return;
      }

      const condition = cities.some(
        ({ cityName }) => cityName.toLowerCase() === cityData.cityName.toLowerCase(),
      );

      if (!condition) {
        const pointsList = JSON.parse(localStorage.getItem('pointsList')) || [];
        localStorage.setItem(
          'pointsList',
          JSON.stringify([...pointsList, `(${cityData.lat},${cityData.lon})`]),
        );

        setCities([...cities, cityData]);
        setName('');
      }
    });
  };

  return (
    <div className="app">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <span className="form__title">Сity name:</span>
          <input
            className="form__input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <button className="form__btn" type="submit">
            Search
          </button>
        </form>
        {cities.length ? (
          <ul className="cities">
            {cities.map(({ cityName, description, icon, temp }) => {
              const reqTime = new Date().toLocaleTimeString();
              return (
                <li key={cityName} className="cities__item city">
                  <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`} alt="logo" />
                  <div className="city__info">
                    <div className="city__name">{cityName}</div>
                    <div className="city__req-time">{`Request time: ${reqTime}`}</div>
                    <div className="city__description">{description}</div>
                  </div>
                  <div className="city__temp">{`${temp}°`}</div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default App;
