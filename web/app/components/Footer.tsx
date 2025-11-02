import React, { useState } from "react";

import { MDBBtn, MDBCardFooter, MDBInputGroup } from "mdb-react-ui-kit";

type Props = { onSend: (message: string) => void };

export function Footer({ onSend }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
        <MDBInputGroup className="mb-0">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Type message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <MDBBtn>Send</MDBBtn>
        </MDBInputGroup>
      </MDBCardFooter>
    </form>
  );
}
