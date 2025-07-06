import React from "react";
import Moment from "moment";

type Props = {
  text: string;
  author: string;
  date: Date;
  image?: string;
  imageType?: string;
};

export function Message({ text, author, date, image, imageType }: Props) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="small mb-1">{author}</p>
        <p className="small mb-1 text-muted">{Moment(date).fromNow()}</p>
      </div>

      <div className="d-flex flex-row justify-content-start">
        <div>
          {image && (
            <div className="p-2 ms-3 mb-2 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
              <img 
                src={`data:${imageType};base64,${image}`}
                alt="Shared image"
                className="img-fluid rounded"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
          {text && (
            <p
              className="small p-2 ms-3 mb-3 rounded-3"
              style={{ backgroundColor: "#f5f6f7" }}
            >
              {text}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function MessageMine({ text, author, date, image, imageType }: Props) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="small mb-1 text-muted">{Moment(date).fromNow()}</p>
        <p className="small mb-1">{author}</p>
      </div>
      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          {image && (
            <div className="p-2 me-3 mb-2 text-white rounded-3 bg-primary">
              <img 
                src={`data:${imageType};base64,${image}`}
                alt="Shared image"
                className="img-fluid rounded"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
          {text && (
            <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-primary">
              {text}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
