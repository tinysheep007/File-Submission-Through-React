import React, { useState } from "react";
import axios from 'axios';

export default function NewApproach() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null)
    const [pure64, setPure64] = useState(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleChange = (e) => {
        let files = e.target.files[0];
        setFile(files);

        let reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = function () {

            let ans = reader.result;
            //data:image/jpeg;
            const myArray = ans.split("base64,");
            setPure64(myArray[1])
            console.log(myArray[1])
            setResult(reader.result)
            console.log(reader.result);
        };


        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const checkIfPure = () => {
        let text = result;
        //console.log(text)
        const myArray = text.split("base64,");
        setPure64(myArray[1])
        console.log(pure64)
    }

    const handleSubmission = () => {
        axios({
            method: 'post',
            url: "http://localhost:3000/base64",
            headers: {},
            data: {
                base64: pure64
            }
        }).then((res) => {
            //please wait for the windows prompt for guidance 
            alert("File Upload success");
        })
            .catch((err) => alert("File Upload Error"));;
    }

    return (
        <div>
            <div>
                <h1>
                    new Approach to convert to base 64
                </h1>
                
                <div>
                    <input
                        type="file"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmission}>Submit to API</button>
                    <button onClick={checkIfPure}>Check if pure</button>
                </div>

                <div>
                    <img src={image} />
                    <input
                        type="file"
                        onChange={onImageChange}
                    />
                </div>
            </div>
        </div>
    )
}