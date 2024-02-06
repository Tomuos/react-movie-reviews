import './App.css';
import Cards from './components/Cards/Cards';
import { Routes, Route } from 'react-router-dom';
import SearchMovie from './components/Search/Search';

function App() {
  return (
    <div className="App">
      

      <Routes>
        <Route path="/" element={<Cards />} />
        
      </Routes>
    </div>
  );
}

export default App;
