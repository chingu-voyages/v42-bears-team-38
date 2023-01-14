import React, { useContext } from 'react';

const Dummy = () => {
	const test = useContext(NewContext);

	return (
		<div>
			<p>Dummy</p>
		</div>
	);
};

export default Dummy;
