import Parse from "parse";
import React from "react";
import Header from '../Header/Header.js';
import UploadForm from "./UploadForm.js";
import UploadInstructions from "./UploadInstructions.js";
import { useEffect } from "react";




const FileUpload = () => {

    //scroll the screen to the top when this component first renders
    //Since the <Link> to this component is located in the middle of the Planner page,
    //this resolves the issue of this component rendering with it scrolled to the middle
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    
    //initialize react varaible
    const [file, setFile] = React.useState("");
    const [flag, setFlag ] = React.useState(false);
    const [status, setStatus] = React.useState("");

    const formRef = React.useRef(null);

    //handler for when the "Upload" button is clicked
    const onSubmit = (event) => {
        event.preventDefault();

        if (file) {

          //create a new Parse.File
          const File = new Parse.File("userScheudle.ics", file);
            
          //save the Parse.File
          //After this occurs, the file is processed in the Parse Cloud Code
          File.save()
              .then((savedFile) => {
                  setFlag(true);
                  setStatus("File uploaded successfully.");

              })
              .catch((error) => {
                  setStatus("Error saving file. Please try agian or enter your schedule manually.");
              });

          //resets file input and selected file
          setFile("");
          if (formRef.current) {
              formRef.current.reset(); 
          }

        } else {
          //inform user that they tried to upload file without a file selected
          setStatus("Please Select the appropriate .ics file to upload.")
        };

      }

    //handler for when user adds file to html file input
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