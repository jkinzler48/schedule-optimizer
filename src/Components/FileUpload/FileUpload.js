import Parse from "parse";

//FileUpload.jsx
import React from "react";


const FileUpload = () => {

    const [file, setFile] = React.useState("");

    const handleFileUpload = (event) => {
    event.preventDefault();
      setFile(event.target.files[0]);
    };

    const formRef = React.useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();
        if (file) {

        const File = new Parse.File("userScheudle.ics", file);
            
            File.save()
                .then((savedFile) => {
                    console.log(file.name + " uploaded successfully");
                   
                    // const Gallery = Parse.Object.extend("Gallery");
                    // const gallery = new Gallery();
                    // gallery.set("photo", photo);
        
                    // return gallery.save();
                })
                // .then((gallery) => {
                //     console.log("File saved:", gallery);
                //     // updateData();
                // })
                .catch((error) => {
                    console.error("Error saving file:", error);
                });
            setFile("");
            if (formRef.current) {
                formRef.current.reset(); // Reset the form using the ref
            }
            };
        }
        
  
  

  return (
    <form ref={formRef}>
      <label htmlFor="file-upload" className="custom-file-upload">
        Select .ics file exported from NOVO that contains class information.
      </label>
      <br />
      <br />
      <input
        id="file-upload"
        type="file"
        filename={file}
        onChange={handleFileUpload}
      />
      <button type="submit" onClick={onSubmit}>
            Upload
      </button>
    </form>
  );
}

export default FileUpload;