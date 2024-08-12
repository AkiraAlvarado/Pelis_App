import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TvListPage from './Components/TvListPage/TvListPage.jsx';
import PageError from './Components/Complements/PageError/PageError.jsx';
import PageMovie from './Components/MoviePage/PageMovies.jsx';
import MovieDetails from './Components/MoviePage/MovieDetails.jsx';
import TvDetails from './Components/TvListPage/TvDetails.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Pelis-App">
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<PageMovie />} /> {/* Página principal */}
        <Route path='MoviesPage' element={<PageMovie />} />
        <Route path='MoviesPage/:id' element={<MovieDetails />} />
        <Route path='/TvListPage' element={<TvListPage />} />
        <Route path='/TvListPage/:id' element={<TvDetails />} />

      </Route>

      <Route path="*" element={<PageError />} />
    </Routes>
  </BrowserRouter>
);