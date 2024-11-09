import step2Image from "../../images/Step2Image.png"
import step3Image from "../../images/Step3Image.png"
import step4Image from "../../images/Step4Image.png"
import step5Image from "../../images/Step5Image.png"
import step6Image from "../../images/Step6Image.png"
import step7Image from "../../images/Step7Image.png"


const UploadInstructions = ({ uploadedFlag }) => {

    
  return (
    <>
        {/* display instructions if a file has not yet been successfully uploaded */}
        {!uploadedFlag && 
            <div className="module">
                <h2>Instructions to Download the required file from NOVO</h2>
                <ol>
                    <li>
                        <h4>Go to the NOVO website: <a href="https://bxeregprod.oit.nd.edu/StudentRegistration/ssb/registration" target="_blank" rel="noreferrer">https://bxeregprod.oit.nd.edu/StudentRegistration/ssb/registration</a></h4>
                    </li>
                    <br />
                    <li>
                        <h4>Select the "Schedules" option from the NOVO page.</h4>
                        <img width="100%" src={step2Image} alt="NOVO screen that highlights the 'Schedules' option."/>
                    </li>
                    <br />
                    <li>
                        <h4>Login to Okta if you are promted to do so.</h4>
                        <img width="100%" src={step3Image} alt="Okta login screen."/>
                    </li>
                    <br />
                    <li>
                        <h4>Select the desired schedule from the "Term" dropdown.</h4>
                        <img width="100%" src={step4Image} alt="Schedule page with the Term dropdown highlighted."/>
                    </li>
                    <br />
                    <li>
                        <h4>Click on the Calendar/Mail icon in the top right corner of the Registration Information section.</h4>
                        <img width="100%" src={step5Image} alt="Schedule page with the Calendar/Mail icon highlighted."/>
                    </li>
                    <br />
                    <li>
                        <h4>Ensure that "Myself (netid@nd.edu)" option is checked, and then click the "Send Button". Alternatively, you can manually
                            enter an Email in one of the text fields below the "Myself (netid@nd.edu)" option, and then click the "Send Button".
                        </h4>
                        <img width="100%" src={step6Image} alt="Schedule page with the 'Myself' checkbox and 'Send' button highlighted"/>
                    </li>
                    <br />
                    <li>
                        <h4>Go to your email that you had the file sent to, and download the .ics file in the email from "noreply_StudentReg@nd.edu".</h4>
                        <img width="100%" src={step7Image} alt="Bottom of the email with the .ics file sent from 'noreply_StudentReg@nd.edu' and the 'Download' link highlighted."/>
                    </li>
                </ol>
            </div>
        } 
    </>
  );
}


export default UploadInstructions;