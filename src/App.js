import { useContext } from 'react';
import { Private } from './apps/Private';
import { Public } from './apps/Public';
import { AuthContext } from './context/AuthContext';
import { Login } from './pages/Login/Login';
// import { Register } from './pages/Register/Register';

function App() {
	const { token } = useContext(AuthContext);
	if (token) {
		return <Private />;
	} else {
		return <Public />;
	}
}

export default App;
