import React, { useState, useRef } from "react";

import { MDBBtn, MDBCardFooter, MDBInputGroup } from "mdb-react-ui-kit";

type Props = { onSend: (message: string, image?: string, imageType?: string) => void };

export function Footer({ onSend }: Props) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const base64Data = base64.split(',')[1];
        setSelectedImage(base64Data);
        setImageType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() || selectedImage) {
      onSend(message, selectedImage || undefined, imageType || undefined);
      setMessage("");
      setSelectedImage(null);
      setImageType(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBCardFooter className="text-muted p-3">
        {selectedImage && (
          <div className="mb-2 position-relative d-inline-block">
            <img 
              src={`data:${imageType};base64,${selectedImage}`}
              alt="Selected"
              className="img-thumbnail"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button 
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0"
              style={{ transform: "translate(50%, -50%)", borderRadius: "50%", width: "24px", height: "24px", padding: "0", fontSize: "12px" }}
              onClick={removeImage}
            >
              ×
            </button>
          </div>
        )}
        <div className="d-flex justify-content-start align-items-center">
          <MDBInputGroup className="mb-0 flex-grow-1">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Type message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <MDBBtn 
              type="button"
              color="light"
              onClick={handleImageClick}
              className="border"
            >
              📷
            </MDBBtn>
            <MDBBtn type="submit">Send</MDBBtn>
          </MDBInputGroup>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />
        </div>
      </MDBCardFooter>
    </form>
  );
}
