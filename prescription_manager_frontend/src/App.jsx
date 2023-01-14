import './App.css';
import { Button } from './stories/button/Button';
import { Page } from './stories/Page';
import DataReducers from './utils/DataReducers';
import { FaSearch } from 'react-icons/fa';

const App = () => {
	return (
		<DataReducers>
			<Page>
				<Button label='Search Patient' icon={<FaSearch />} />
			</Page>
		</DataReducers>
	);
};

export default App;
