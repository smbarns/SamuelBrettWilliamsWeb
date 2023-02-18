import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import Films from "./pages/Films";
import Plays from "./pages/Plays";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import SocialMediaBar from './components/SocialMediaBar';
<<<<<<< HEAD
import Details from './pages/Details'
import Admin from './pages/Admin';
=======
import FilmDetails from './pages/FilmDetails'
import PlayDetails from './pages/PlayDetails'
>>>>>>> 6b50ccdd1f14499a7cf97e56727cb62bcf2d00e5

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route path = "" element = {<Home/>} />
        <Route path = "biography" element =  {<Biography/>}/>
        <Route path = "plays" element =  {<Plays/>}/>
        <Route path = "films" element =  {<Films/>}/>
        <Route path = "press" element =  {<Press/>}/>
        <Route path = "contact" element =  {<Contact/>}/>
<<<<<<< HEAD
        <Route path = "admin" element = {<Admin/>}/>
        <Route path = "details/:type" element = {<Details/>}/>
=======
        <Route path = "filmdetails/:type" element = {<FilmDetails/>}/>
        <Route path = "playdetails/:type" element = {<PlayDetails/>}/>
>>>>>>> 6b50ccdd1f14499a7cf97e56727cb62bcf2d00e5
      </Routes>
      </Router>
    
      <SocialMediaBar/>
    </div>
  );
}

export default App;
