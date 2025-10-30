import React from "react";

import { MDBBtn, MDBCardHeader, MDBIcon } from "mdb-react-ui-kit";

type Props = {
  onLogout: () => void;
};

export function Header({ onLogout }: Props) {
  return (
    <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
      <h5 className="mb-0">RPi Chat</h5>
      <MDBBtn tag="a" color="none" onClick={onLogout}>
        <MDBIcon fas icon="sign-out-alt" />
      </MDBBtn>
    </MDBCardHeader>
  );
}
