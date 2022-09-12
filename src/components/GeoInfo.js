import React, { useEffect, useState } from 'react';

function GeoInfo(props) {
	const { temperature, time, day, windspeed } = props;

	return (
		<>
			<div>
				temperatura: {temperature} dia: {time}
				hora:
				{day}
				vel. vento : {windspeed}
			</div>
		</>
	);
}

export default GeoInfo;
