import React, { useState } from 'react';
import imageToBase64 from 'image-to-base64/browser';

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
        //console.log(selectedFile);
        console.log("what's in form Data: " + formData.get("File"));
        console.log(formData.get("File"))
        //submission through API
        //make sure to create your own account and find the API key for your own account 
        //in free Image website
        fetch(
            `https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&source=${base64}`,
            {
                method: 'POST',
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <h2>Submit Your Files Here</h2>
            <div>
                <input type="file" name="file" onChange={changeHandler} />
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
                <button onClick={checkSelection}>Check What's in Current Selection In Conosle</button>
            </div>

            <div>
                <button onClick={handleSubmission}>Submit to freeImage host</button>
            </div>
            <button onClick={() => { console.log(selectedFile) }}>check</button>

            <button onClick={handleForm}>Submit V2.0 to local 3000</button>
        </div>
    )




};

