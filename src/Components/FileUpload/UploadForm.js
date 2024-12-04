import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


const UploadForm = ({file, uploadedFlag, handleFileUpload, onSubmit, formRef, status}) => {

  return (
    <>
        <div className="module">
            {/* display status if there is one to display */}
            {status && <h4>{status}</h4>}
            {/* if the file has not been uploaded, display upload form */}
            {!uploadedFlag ? (
                <>
                    <form ref={formRef}>
                        <h4>
                            Select .ics file exported from <a href="https://bxeregprod.oit.nd.edu/StudentRegistration/ssb/registration" target="_blank" rel="noreferrer">NOVO</a> that 
                            contains class information to add classes from NOVO. See below for instructions on how to acquire this .ics file.
                        </h4>
                        <input
                            id="file-upload"
                            accept=".ics"
                            type="file"
                            filename={file}
                            onChange={handleFileUpload}
                        />
                        <br />
                        <br />
						<Button variant="contained" onClick={onSubmit}>Upload</Button>
                        {/* <button type="submit" onClick={onSubmit}>
                            Upload
                        </button> */}
                    </form>
                </>
                ) : (
                // if file has already been uploaded, then display button with link back to planner page
                <>
                    <Link to="/">
						<Button variant="contained">Return to Planner</Button>
                    </Link>
                </>
            )
            }   
        </div>
    </>
  );
}

export default UploadForm;