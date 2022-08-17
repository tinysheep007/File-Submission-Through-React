import React from "react";
import rigLOGO from '../rigLOGO.jpg';

export default function Home() {
  return (
    <div>
      <h1>This is Home Page!</h1>
      <div style={{fontSize:"30px"}}>Go Explore By pressing the navbar tabs!</div>
      <p>
        First, go through the Submit tab. You will first learn the basic through
        converting photos into base64 format using NPM modules.
      </p>
      <p>
        Second, go through the New appraoch tab. You will learn how js build-in
        file readers convert photos to base64
      </p>
      <p>
        Third, go test what you learned and submit two photos through API or
        compare them!
      </p>
      <p>
        P.S. Don't forget to read through the source code under /src/Components
        to fully understand
        https://github.com/tinysheep007/File-Submission-Through-React
      </p>
      <img src={rigLOGO}/>

    </div>
  );
}
