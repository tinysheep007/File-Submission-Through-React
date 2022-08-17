import React from "react";
import rigLOGO from "../rigLOGO.jpg";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <h1>This is Home Page!</h1>
      <div style={{ fontSize: "30px" }}>
        Go Explore By pressing the navbar tabs!
      </div>
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
      <Button href="/Submit" variant="contained" style={{padding:"15px", fontSize:"15px", marginRight:"20px"}}>Don't Know Where to Start?</Button>
      
      <Button href="https://github.com/tinysheep007/RIG-Photo-Submission-Comparasion-Through-Base64" variant="outlined" style={{padding:"15px", fontSize:"15px"}}>Go to Code!</Button>
      <div>
        <img src={rigLOGO} />
      </div>
    </div>
  );
}
