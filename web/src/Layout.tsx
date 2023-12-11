import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <MDBContainer fluid className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
            {children}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
