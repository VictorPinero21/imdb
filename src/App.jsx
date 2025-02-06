import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmDetails from './pages/FilmDetails';
import Home from './pages/Home';
//en la ruta donde paso parametros tiene que llamarse los /: igual que en el usparams
function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Home />} />
    <Route path="/film/:id" element={<FilmDetails />} />
  </Routes>
  );
}

export default App;
