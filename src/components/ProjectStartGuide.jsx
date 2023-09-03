import { useState } from "react";
import { Alert } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { BiCheck, BiSolidCopyAlt } from "react-icons/bi";

function ProjectStartGuide() {
  const [copied, setCopied] = useState(false);
  return (
    <Alert id="start-guide" variant="light">
      <div className="step-install">
        <p className="fw-bold">
          install <code>land-cli</code>:
        </p>
        <p>
          <span>
            <code>curl -sSL https://runtime.land/install.sh | bash</code>
            <CopyToClipboard
              text={"curl -sSL https://runtime.land/install.sh | bash"}
              onCopy={() => setCopied(true)}
            >
              {copied ? (
                <BiCheck className="ms-2" />
              ) : (
                <BiSolidCopyAlt className="ms-2" role="button" />
              )}
            </CopyToClipboard>
          </span>
        </p>
      </div>
      <div className="step-create-project">
        <p className="fw-bold">create local project:</p>
        <p>
          <code>land-cli init hello-rust</code>
        </p>
        <p>
          <code>cd hello-rust</code>
        </p>
        <p>
          <code>land-cli build</code>
        </p>
      </div>
      <div className="step-create-deployment">
        <p className="fw-bold">
          use <code>land-cli</code> to deploy project:
        </p>
        <p>
          <code>land-cli deploy --token=[your-deploy-token]</code>
        </p>
      </div>
    </Alert>
  );
}

export default ProjectStartGuide;
