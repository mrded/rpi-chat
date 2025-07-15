import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <MDBContainer fluid className="py-2 py-md-5" style={{ minHeight: "100vh" }}>
      <MDBRow className="d-flex justify-content-center h-100">
        <MDBCol xs="12" md="10" lg="8" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: "15px", height: "100%", maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {children}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
