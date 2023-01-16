import React, { useMemo, useReducer } from 'react';
import { DataContext } from './DataContext';

const DataReducers = ({ children }) => {
	const initialState = {
		loggedIn: false,
		user: {
			name: null,
		},
	};

	const loginReducer = (state, action) => {
		switch (action.type) {
			case 'login': {
				return { ...state, loggedIn: true, user: { name: 'David' } };
			}
			case 'logout': {
				return { ...state, loggedIn: false, user: null };
			}
			default:
				return initialState;
		}
	};

	const [state, dispatch] = useReducer(loginReducer, initialState);

	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);
	return (
		<DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
	);
};

export default DataReducers;
