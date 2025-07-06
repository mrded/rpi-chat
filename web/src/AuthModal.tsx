import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle
} from "mdb-react-ui-kit";
import React from "react";

type Props = {
  isOpen: boolean;
  onLogin: (name: string) => void;
};

export function AuthModal({ isOpen, onLogin }: Props) {
  const [name, setName] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim()) onLogin(name);
  };

  return (
    <MDBModal staticBackdrop open={isOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <form onSubmit={handleSubmit}>
            <MDBModalHeader>
              <MDBModalTitle>RPi Chat</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                Welcome to RPi Chat! 👋
              </p>
              <p>
                This is an offline chat where you can connect with other people
                without internet. Share messages and photos with others nearby!
              </p>
              <div className="mb-3">
                <MDBInput
                  value={name}
                  onChange={e => setName(e.target.value)}
                  labelClass="col-form-label"
                  label="Enter your name"
                  required
                />
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="submit">Log in</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
