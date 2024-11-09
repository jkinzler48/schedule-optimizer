import Parse from "parse";
import Header from '../Header/Header.js';
import UploadForm from "./UploadForm.js";
import UploadInstructions from "./UploadInstructions.js";

//FileUpload.jsx
import React from "react";



const FileUpload = () => {

    const [file, setFile] = React.useState("");
    const [flag, setFlag ] = React.useState(false);
    const [status, setStatus] = React.useState("");

    const formRef = React.useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();
        if (file) {

        const File = new Parse.File("userScheudle.ics", file);
            
            File.save()
                .then((savedFile) => {
                    setFlag(true);
                    setStatus("File uploaded successfully.");

                })
                .catch((error) => {
                    setStatus("Error saving file. Please try agian or enter your schedule manually.");
                });
            setFile("");
            if (formRef.current) {
                formRef.current.reset(); // Reset the form using the ref
            }
            };
        }

    const handleFileUpload = (event) => {
      event.preventDefault();
      setFile(event.target.files[0]);
    };
        
  
  

  return (
    <>
    <Header />
    <UploadForm 
      file={file}
      uploadedFlag = {flag}
      handleFileUpload={handleFileUpload}
      onSubmit={onSubmit}
      formRef={formRef}
      status={status}
    />
    <UploadInstructions 
      uploadedFlag = {flag}
    />
    </>
  );
}

export default FileUpload;