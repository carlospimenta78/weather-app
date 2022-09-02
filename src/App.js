import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const [data, setData] = useState();

	const updateValues = e => {
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,windspeed_10m`
		)
			.then(e => e.json())
			.then(info => setData(info));
		e.preventDefault();
	};

	console.log(data);
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
		</div>
	);
}

export default App;
