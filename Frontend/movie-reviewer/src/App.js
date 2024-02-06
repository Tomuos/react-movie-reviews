import './App.css';
import Cards from './components/Cards/Cards';
import { Routes, Route } from 'react-router-dom';


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
