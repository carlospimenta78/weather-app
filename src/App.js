import './App.css';

import React, { useEffect, useState } from 'react';

import GeoInfo from './components/GeoInfo';

function App() {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [isFavourite, setIsFavourite] = useState(null);
	const [data, setData] = useState({});

	const updateValues = e => {
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m`
		)
			.then(e => e.json())
			.then(async info => {
				console.log('info ' + JSON.stringify(info));
				setData(info);
				const variable = await localStorage.getItem(
					'latitude:' +
						latitude.toString() +
						'logitude: ' +
						longitude.toString()
				);

				setIsFavourite(variable ? true : false);
			});
		e.preventDefault();
	};

	/*
	 */
	const changeFavouriteVAlue = async () => {
		if (isFavourite) {
			await localStorage.removeItem(
				'latitude:' + latitude.toString() + 'logitude: ' + longitude.toString()
			);
			setIsFavourite(false);
		} else {
			localStorage.setItem(
				'latitude:' + latitude.toString() + 'logitude: ' + longitude.toString(),
				'true'
			);
			setIsFavourite(true);
		}
	};

	return (
		<div>
			<form onSubmit={updateValues}>
				<label>Latitude</label>
				<input
					type='float'
					value={latitude}
					onChange={event => setLatitude(event.target.value)}
				></input>

				<label>Longitude</label>
				<input
					type='float'
					value={longitude}
					onChange={event => setLongitude(event.target.value)}
				></input>
				<button type='submit'>Submit</button>
			</form>
			{isFavourite !== null && (
				<button onClick={changeFavouriteVAlue}>
					{isFavourite ? 'Remove From' : 'Add to'} favourites
				</button>
			)}

			{data.hourly &&
				data.hourly.temperature_2m.map((temperature_2m, index) => (
					<div>
						<GeoInfo
							temperature={temperature_2m}
							time={data.hourly.time[index].split('T')[1]}
							day={data.hourly.time[index].split('T')[0]}
							windspeed={data.hourly.windspeed_10m[index]}
						/>
					</div>
				))}
		</div>
	);
}

export default App;
