import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import './home.css';
import { Button } from '../../stories/button/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	return (
		<div>
			<div className='input-wrapper'>
				<div className='options-wrapper'>
					<Button
						label='Add Patient'
						primary={false}
						icon={<AiOutlinePlusCircle />}
						onClick={() => navigate('addPatient')}
					/>
					<Button
						label='Find Patient'
						icon={<AiOutlineSearch />}
						onClick={() => navigate('findPatient')}
					/>

					<Button
						label='New Prescription'
						primary={false}
						icon={<AiOutlinePlusCircle />}
						onClick={() => navigate('newPrescription')}
					/>
					<Button
						label='Find Prescription'
						icon={<AiOutlineSearch />}
						onClick={() => navigate('findPrescription')}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
