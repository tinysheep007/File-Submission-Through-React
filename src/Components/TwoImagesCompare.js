import React, { useState } from "react";
import axios from 'axios';
import { Button } from "@mui/material";
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
    const [id1, setId1] = useState(1);
    const [id2, setId2] = useState(2);

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
                pic2ID: id2
            }
        }).then((res) => {
            //please wait for the windows prompt for guidance 
            alert("File Upload success");
            setResult(res)
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
            <div style={{ width: "50%", float: "left" }}>
                <div style={{ font: "30px", fontWeight: "bold" }}>
                    Image 1 Upload
                </div>


                <div>
                    <input type="file" onChange={onChangePic1} ></input>
                </div>
                <img src={pic1} style={{ border: "5px solid red", width: "300px", height: "300px" }} />

            </div>

            <div>
                <div style={{ font: "30px", fontWeight: "bold" }}>
                    Image 2 Upload
                </div>
                <div>
                    <input type="file" onChange={onChangePic2}></input>
                </div>
                <img src={pic2} style={{ border: "5px solid pink", width: "300px", height: "300px" }} />
            </div>

            <Button variant="contained" onClick={generateUUID}>display UUID </Button>
            <div>
                <div>UUID FOR PIC1 : {id1}</div>
                <div>UUID FOR PIC2 : {id2}</div>
            </div>

            <Button variant="contained" color="success" onClick={handleSubmission}>Compare Two Images</Button>
            <div>
                display results below
                {result}
            </div>
        </div>
    )
}