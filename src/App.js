import logo from './logo.svg';
import './App.css';
import Submit from './Components/Submit';
import NewApproach from './Components/NewApproach';
import TwoImagesCompare from './Components/TwoImagesCompare';
import Navbar from './Components/Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from './Components/Home';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Submit" element={<Submit />} />
        <Route path="/New%20Apporach" element={<NewApproach />} />
        <Route path="/TwoImagesCompare" element={<TwoImagesCompare />} />
      </Routes>
      
      {/* <Submit />
      <hr/>
      <NewApproach />
      <hr /> */}
    </div>
  );
}

export default App;
