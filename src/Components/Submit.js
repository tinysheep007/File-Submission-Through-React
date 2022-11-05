import React, { useState } from 'react';
import imageToBase64 from 'image-to-base64/browser';
import axios from 'axios';
import { Button } from '@mui/material';
import firstbase64 from '../firstbase64.jpg';

export default function Submit() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64, setBase64] = useState("");

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const checkSelection = () => {
        console.log(selectedFile);
    };

    const whatsinNPM64 = () => {
        imageToBase64('./cat.jpg') // Path to the image
            .then(
                (response) => {
                    console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
                    setBase64(response)
                }
            )
    }

    const handleSubmission = () => {
        imageToBase64(`./${selectedFile.name}`) // Path to the image
            .then(
                (response) => {
                    console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
                    setBase64(response)
                }
            )
            .catch(
                (error) => {
                    console.log(error); // Logs an error if there was one
                }
            )

        //creating new formData instance 
        const formData = new FormData();
        //attach our file into FormData
        formData.append('File', selectedFile);
        console.log("following its formData");
        formData.append("name", "new Item Added");
        console.log(formData.get('File'))
        console.log("all formData")
        console.log(formData)

        // Display the key/value pairs in the formData
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios({
            method: 'post',
            url: "http://localhost:3000/base64",
            headers: {},
            data: {
                base64: "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",
                info: base64 // This is the body part
            }
        }).then((res) => {
            alert("File Upload success");
        })
            .catch((err) => alert("File Upload Error"));
    };


    return (
        <div>
            <h2>Submit Your Files Here</h2>

            <div>
                <p>
                    Used NPM module imageToBase64 libaray to convert
                </p>
            </div>

            <div>
                <input type="file" name="file" onChange={changeHandler} />
            </div>

            <div>
                <Button variant="contained" onClick={whatsinNPM64} style={{ marginTop: "10px" }} >NPM: Show base 64 format of the cat.jpg
                    <div>Results will be logged on console</div>
                </Button>

            </div>

            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <Button onClick={checkSelection} >Check What's in Current Selection In Conosle</Button>
            </div>

            <div>
                <button onClick={handleSubmission}>Submit to freeImage host</button>
            </div>
            <button onClick={() => { console.log(selectedFile) }}>What's My selectedFile State</button>

            <button >Submit V2.0 to local 3000</button>

            <img style={{display:"block", margin:"auto"}} src={firstbase64}/>
        </div>
    )




};

