import logo from './logo.svg';
import './App.css';
import Submit from './Components/Submit';
import NewApproach from './Components/NewApproach';
import TwoImagesCompare from './Components/TwoImagesCompare';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function App() {

  const [apiText, setapiText] = useState("");

  const handleButton = () => {
    axios({
      method: 'get',
      url: "https://api.quotable.io/random",
      headers: {},
      data: {
      }
    }).then((res) => {
      console.log(res)
      let quote = res.data.content
      setapiText(quote)
      // alert("got from api")
    })
      .catch((err) => alert("Error"));
  }
  return (

    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Submit" element={<Submit />} />
        <Route path="/New%20Apporach" element={<NewApproach />} />
        <Route path="/TwoImagesCompare" element={<TwoImagesCompare />} />
      </Routes>

      {/* <Submit />
      <hr/>
      <NewApproach />
      <hr /> */}
      <Button variant="contained" onClick={handleButton} >
        Click to get API
      </Button>
      <div>
        stuff we get from API: 
        {apiText}
      </div>

    </div>
  );
}

export default App;
