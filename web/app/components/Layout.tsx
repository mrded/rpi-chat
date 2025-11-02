import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <MDBContainer fluid className="py-md-5 p-0">
      <MDBRow className="d-flex justify-content-center g-0">
        <MDBCol xs="12" md="10" lg="8" xl="6">
          <MDBCard
            id="chat2"
            className="rounded-0 rounded-md-3"
            style={{ minHeight: "100vh" }}
          >
            {children}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
