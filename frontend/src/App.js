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
import Details from './pages/Details'
import Admin from './pages/Admin';

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
        <Route path = "admin" element = {<Admin/>}/>
        <Route path = "details/:type" element = {<Details/>}/>
      </Routes>
      </Router>
    
      <SocialMediaBar/>
    </div>
  );
}

export default App;
