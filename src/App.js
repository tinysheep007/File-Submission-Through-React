import logo from './logo.svg';
import './App.css';
import Submit from './Submit';
import NewApproach from './NewApproach';
import TwoImagesCompare from './TwoImagesCompare';
import Navbar from './Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from './Home';

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
