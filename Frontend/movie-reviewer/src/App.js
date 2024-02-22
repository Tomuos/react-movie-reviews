import './App.css';
import Cards from './components/Cards/Cards';
import MovieReviews from './components/MovieReviews/MovieReviews';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      

      <Routes>
        <Route path="/" element={<Cards />} /> 
        <Route path="/movie/:id" element={<MovieReviews />}/>
        
      </Routes>
    </div>
  );
}

export default App;
