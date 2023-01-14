import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../button/Button';
import './header.css';
import { DataContext } from '../../utils/DataContext';

export const Header = ({ onLogin, onLogout, onCreateAccount }) => {
	const {
		state: { user },
	} = useContext(DataContext);

	return (
		<header>
			<div className='wrapper'>
				<div>
					<h1 className='logo'>Prescription Manager</h1>
				</div>
				<div>
					{user ? (
						<>
							<span className='welcome'>
								Welcome, <b>{user.name}</b>!
							</span>
							<Button size='small' onClick={onLogout} label='Log out' />
						</>
					) : (
						<>
							<Button size='small' onClick={onLogin} label='Log in' />
							<Button
								primary
								size='small'
								onClick={onCreateAccount}
								label='Sign up'
							/>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.shape({}),
	onLogin: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
	onCreateAccount: PropTypes.func.isRequired,
};

Header.defaultProps = {
	user: { name: 'david' },
};
