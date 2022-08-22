import React, { useState } from "react";
import axios from 'axios';
import { Button, CircularProgress } from "@mui/material";
import * as uuid from 'uuid';

export default function TwoImagesCompare() {

    const [pic1, setPic1] = useState();
    const [file1, setFile1] = useState();
    const [pic1base64, setPic1base64] = useState();
    const [pic2, setPic2] = useState();
    const [file2, setFile2] = useState();
    const [pic2base64, setPic2base64] = useState();
    const [result, setResult] = useState();
    const [sampleUUID, setSampleUUID] = useState();
    const [id1, setId1] = useState(uuid.v4);
    const [id2, setId2] = useState(uuid.v4);
    const [b1Click, setB1click] = useState(false);
    const [b2Click, setB2click] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [finishLoading, setFinishLoading] = useState(false);
    const [detector_backend, setDetector_backend] = useState();
    const [distance, setDistance] = useState();
    const [model, setModel] = useState();
    const [similarity_metric, setSimilarity_metric] = useState();
    const [threshold, setThreshold] = useState();
    const [verified, setVerified] = useState();




    const onChangePic1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPic1(URL.createObjectURL(event.target.files[0]));
        }

        let files = event.target.files[0];
        setFile1(files);

        let reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = function () {

            let ans = reader.result;
            //data:image/jpeg;
            const myArray = ans.split("base64,");
            setPic1base64(myArray[1])
            console.log(myArray[1])

        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onChangePic2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPic2(URL.createObjectURL(event.target.files[0]));
        }

        let files = event.target.files[0];
        setFile2(files);

        let reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = function () {

            let ans = reader.result;
            //data:image/jpeg;
            const myArray = ans.split("base64,");
            setPic2base64(myArray[1])
            console.log(myArray[1])
        };


        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    const handleSubmission = () => {
        axios({
            method: 'post',
            url: "http://127.0.0.1:5000/picToBase64",
            headers: {},
            data: {
                pic1base64: pic1base64,
                pic1ID: id1,
                pic2base64: pic2base64,
                pic2ID: id2,
                base64: pic1base64
            }
        }).then((res) => {
            //please wait for the windows prompt for guidance 
            alert("File Upload success");
            setResult(res)
        })
            .catch((err) => alert("File Upload Error"));;
    }


    const handleAWS = (e) => {

        //when first click for the call
        //loading circles goes out
        setIsloading(true);

        axios({
            method: 'post',
            url: "http://100.25.137.161:8080/verify",
            headers: {},
            data: {
                image1: pic1base64,
                image2: pic2base64,
            }
        }).then((res) => {
            //please wait for the windows prompt for guidance 
            alert("File Upload success");
            setResult(res)
            console.log(res)
            console.log("result: " + result);
            console.log("data is " + res.data);

            //set all relevant info
            setDetector_backend(res.data.detector_backend);
            setDistance(res.data.distance);
            setModel(res.data.model);
            setSimilarity_metric(res.data.similarity_metric);
            setThreshold(res.data.threshold);
            setVerified(res.data.verified);

            //when the call is finished
            setIsloading(false);

            //loading its finished
            setFinishLoading(true);
        })
            .catch((err) => alert("File Upload Error"));;


    }


    const generateUUID = () => {
        setId1(uuid.v4);
        setId2(uuid.v4)
    }

    return (
        <div>

            <h2>Compare Pictures Here! </h2>
            <div>
                <p>
                    When you upload a picture, its base64 format will be displayed on console
                </p>

                <p>
                    In order to test your file submission, please go clone my other express backend code
                    at https://github.com/tinysheep007/flask-convert-base64-to-photo
                </p>

                <p>
                    All running instructions are provided there
                </p>

                <p>
                    For API parameter check TwoIamgesCompare.js
                </p>

                <p>
                    Remeber to click the genarate a new UUID for both photo before submitting
                </p>

            </div>
            <div style={{ width: "50%", float: "left", alignItems: "center", justifyContent: "center" }}>
                <div style={{ font: "30px", fontWeight: "bold" }}>
                    Image 1 Upload
                </div>


                <div>
                    <input style={{ margin: "10px" }} type="file" onChange={onChangePic1} ></input>
                </div>
                <img src={pic1} style={{ border: "5px solid red", width: "300px", height: "300px" }} />
                <div>UUID FOR PIC1 : {id1}</div>
                <Button onClick={() => setB1click(!b1Click)}>Show / Hide base64</Button>
                <div>
                    {
                        b1Click ? (<div style={{ textAlign: "center", display: "flex" }}>
                            {pic1base64 ? (<div style={{ width: "250px", overflow: "auto", border: "3px solid red", marginLeft: "30%" }}> {pic1base64}</div>) : ""}
                        </div>) : ""
                    }
                </div>



            </div>

            <div>
                <div style={{ font: "30px", fontWeight: "bold" }}>
                    Image 2 Upload
                </div>
                <div>
                    <input style={{ margin: "10px" }} type="file" onChange={onChangePic2}></input>
                </div>
                <img src={pic2} style={{ border: "5px solid pink", width: "300px", height: "300px" }} />
                <div>UUID FOR PIC2 : {id2}</div>
                <Button onClick={() => setB2click(!b2Click)}>Show / Hide base64</Button>

                <div>
                    {
                        b2Click ? (<div>
                            {pic2base64 ? (<div style={{ width: "250px", overflow: "auto", marginLeft: "65%", border: "3px solid pink" }}>{pic2base64}</div>) : ""}
                        </div>) : ""
                    }
                </div>



            </div>

            <Button variant="contained" onClick={generateUUID} style={{ marginRight: "20px" }}>display UUID </Button>

            <Button variant="contained" color="success" onClick={handleSubmission}>Compare Two Images</Button>

            <Button variant="contained" color="warning" disabled={isLoading ? true : false} onClick={handleAWS} style={{ marginLeft: "20px" }}>Test AWS EC2 INSTANCE</Button>

            <Button variant="contained" color="error" onClick={() => console.log(result.data)} style={{marginLeft:"20px"}} >Check Result State</Button>
            <div>
                <div style={{ font: "30px", fontWeight: "bold", margin: "20px" }}>
                    Display Results Below

                </div>
                <div >
                    {isLoading ? (<div>
                        <CircularProgress color="inherit" />
                        <div style={{ margin: "20px" }}>
                            Usually takes about 10 seconds...
                        </div>
                    </div>) : (<div></div>)}

                    {finishLoading ? (<div>
                        <div style={{ margin: "2.5px" }}>
                            Detector Backend: {detector_backend}
                        </div>

                        <div style={{ margin: "2.5px" }}>
                            Distance: {distance}
                        </div>

                        <div style={{ margin: "2.5px" }}>
                            Model: {model}
                        </div>

                        <div style={{ margin: "2.5px" }}>
                            Similarity Metric: {similarity_metric}

                        </div>

                        <div style={{ margin: "2.5px" }}>
                            Threshold: {threshold}
                        </div>

                        <div style={{ margin: "2.5px" }}>
                            Verified: {verified ? "true" : 'false'}
                        </div>

                    </div>) : (<div></div>)}







                </div>
            </div>

        </div>
    )
}