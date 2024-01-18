import './App.css';
import Card from './components/Card/Card';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Movie Reviewer</h1>

      <Routes>
        <Route path="/" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
