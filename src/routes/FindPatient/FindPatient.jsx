import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from '../../stories/button/Button';
import { Input } from '../../stories/input/Input';
import { searchPatient } from '../../utils/perscriptionApi/perscriptionApi';
import './findPatient.css';

const FindPatient = () => {
	const [searchEmail, setSearchEmail] = useState('');
	const [data, setData] = useState(null);

	const handleSearch = async () => {
		const patientData = await searchPatient(searchEmail);

		setData(patientData);
	};

	return (
		<div>
			<Input
				value={searchEmail}
				onChange={setSearchEmail}
				label='E-mail'
				icon={<AiOutlineSearch />}
			/>
			<Button label='Search' onClick={handleSearch} />
			{data && <p>{JSON.stringify(data)}</p>}
		</div>
	);
};

export default FindPatient;
