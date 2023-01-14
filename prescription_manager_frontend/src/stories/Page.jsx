import React, { useContext } from 'react';
import { DataContext } from '../utils/DataContext';

import { Header } from './header/Header';
import './page.css';

export const Page = ({ children }) => {
	const { dispatch } = useContext(DataContext);

	return (
		<div>
			<Header
				onLogin={() => dispatch({ type: 'login' })}
				onLogout={() => dispatch({ type: 'logout' })}
				onCreateAccount={() => setUser({ name: 'Jane Doe' })}
			/>
			{children}
		</div>
	);
};
