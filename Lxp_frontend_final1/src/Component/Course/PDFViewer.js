import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Container, Overlay, Row } from "react-bootstrap";
 import {fetchContentUrlRequest} from "../../action/Course/FetchContentUrlAction";
function PDFViewer(prop) {
  const [error, setError] = useState(null);
  const { material } = prop;
  const [viewpdf, setViewPdf] = useState("");
  const dispatch = useDispatch();
 
  const pdf = useSelector((state) => state.fetchContentUrl.content);
 
  useEffect(() => {
    dispatch(fetchContentUrlRequest(material)); 
  }, [ material]);
 
  useEffect(() => {
   
      setViewPdf(pdf.filePath);
   
  }, [pdf]);
 
 
  return (
    <Container>
      <Row className="justify-content-md-center">
        <div className="pdf-container" style={{ width: "85vh", height: "83vh",overflow: "auto",marginTop:'7px' }}>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {viewpdf ? (
                <Viewer fileUrl = {viewpdf} />
              ) : (
                <div>No PDF available</div>
              )}
            </Worker>
          )}
        </div>
      </Row>
    </Container>

  );
}
export default PDFViewer;