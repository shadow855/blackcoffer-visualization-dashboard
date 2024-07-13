import './App.css';
import Dashboard from './Components/Dashboard';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <Dashboard />
  );
}

export default App;
