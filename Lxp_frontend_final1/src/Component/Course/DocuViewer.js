// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, Row } from "react-bootstrap";
// import mammoth from "mammoth";
// import { fetchContentUrlRequest } from "../../action/Course/FetchContentUrlAction";

// function DocxViewer(prop) {
//   const [error, setError] = useState(null);
//   const { material } = prop;
//   const [viewDoc, setViewDoc] = useState("");
//   const dispatch = useDispatch();

//   const doc = useSelector((state) => state.fetchContentUrl.content);

//   useEffect(() => {
//     dispatch(fetchContentUrlRequest(material));
//   }, [material]);

//   useEffect(() => {
//     if (doc.filePath) {
//       mammoth.convertToHtml({ path: doc.filePath })
//         .then(function(result){
//           setViewDoc(result.value);
//         })
//         .catch(function(err){
//           setError(err);
//         });
//     }
//   }, [doc]);

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <div className="docx-container" style={{ width: "85vh", height: "83vh", overflow: "auto", marginTop: '7px' }}>
//           {error ? (
//             <div className="error">{error}</div>
//           ) : (
//             viewDoc ? (
//               <div dangerouslySetInnerHTML={{ __html: viewDoc }} />
//             ) : (
//               <div>No Document available</div>
//             )
//           )}
//         </div>
//       </Row>
//     </Container>
//   );
// }

// export default DocxViewer;
//------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import mammoth from "mammoth";
import { fetchContentUrlRequest } from "../../action/Course/FetchContentUrlAction";

function DocxViewer(prop) {
  const [error, setError] = useState(null);
  const { material } = prop;
  const [viewDoc, setViewDoc] = useState("");
  const dispatch = useDispatch();

  const doc = useSelector((state) => state.fetchContentUrl.content);

  useEffect(() => {
    dispatch(fetchContentUrlRequest(material));
  }, [material]);

  useEffect(() => {
    if (doc.filePath) {
      fetch(doc.filePath)
        .then(response => response.blob())
        .then(blob => {
          mammoth.extractRawText({ arrayBuffer: blob.arrayBuffer() })
            .then(result => setViewDoc(result.value))
            .catch(setError);
        })
        .catch(setError);
    }
  }, [doc]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <div className="docx-container" style={{ width: "85vh", height: "83vh", overflow: "auto", marginTop: '7px' }}>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            viewDoc ? (
              <div dangerouslySetInnerHTML={{ __html: viewDoc }} />
            ) : (
              <div>No Document available</div>
            )
          )}
        </div>
      </Row>
    </Container>
  );
}

export default DocxViewer;
//=============================================================================
// import React, { useState, useEffect } from "react";
// import { Container, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContentUrlRequest } from "../../action/Course/FetchContentUrlAction";

// function DocxViewer({ materialId }) {
//   const [error, setError] = useState(null);
//   const [viewDocx, setViewDocx] = useState("");
//   const dispatch = useDispatch();

//   const docx = useSelector((state) => state.fetchContentUrl.content);

//   useEffect(() => {
//     dispatch(fetchContentUrlRequest(materialId));
//   }, [materialId, dispatch]);

//   useEffect(() => {
//     if (docx.filePath) {
//       setViewDocx(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(docx.filePath)}`);
//     } else {
//       // Set the SharePoint link if filePath is not available
//       setViewDocx("https://relevantztech-my.sharepoint.com/:w:/r/personal/praveen_janarthanam_relevantz_com/_layouts/15/Doc.aspx?sourcedoc=%7BAFF7A094-EED3-58B9-7DCC-7B808BE957C0%7D&file=visual%20studio.docx&action=default&mobileredirect=true&DefaultItemOpen=1");
//     }
//   }, [docx]);

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <div className="docx-container" style={{ width: "85vh", height: "83vh", overflow: "auto", marginTop: "7px" }}>
//           {error ? (
//             <div className="error">{error}</div>
//           ) : (
//             viewDocx ? (
//               <iframe src={viewDocx} style={{ width: "100%", height: "100%" }} frameBorder="0"></iframe>
//             ) : (
//               <div>No DOCX available</div>
//             )
//           )}
//         </div>
//       </Row>
//     </Container>
//   );
// }

// export default DocxViewer;
//==================================================================================
// import React, { useState } from 'react';
// import Mammoth from 'mammoth';
// import { Viewer, Worker } from '@react-pdf-viewer/core';

// function DocxToPdfConverter({ docxFile }) {
//     const [pdfUrl, setPdfUrl] = useState(null);

//     // Convert DOCX to HTML using Mammoth
//     const convertToHtml = async (file) => {
//         return new Promise((resolve, reject) => {
//             let reader = new FileReader();

//             reader.onload = function(event) {
//                 let arrayBuffer = event.target.result;

//                 Mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
//                     .then(result => resolve(result.value))
//                     .catch(reject);
//             };

//             reader.readAsArrayBuffer(file);
//         });
//     };

//     // Convert HTML to PDF using jsPDF and html2canvas
//     const convertHtmlToPdf = async (html) => {
//         let pdf = new jsPDF();
//         let canvas = await html2canvas(html);
//         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
//         let pdfOutput = pdf.output();
//         let buffer = new ArrayBuffer(pdfOutput.length);
//         let array = new Uint8Array(buffer);

//         for (let i = 0; i < pdfOutput.length; i++) {
//             array[i] = pdfOutput.charCodeAt(i);
//         }
//         let blob = new Blob(
//             [array],
//             { type: 'application/pdf', encoding: 'raw' }
//         );
//         setPdfUrl(URL.createObjectURL(blob));
//     };

//     // Handle file upload
//     const handleFileUpload = async (event) => {
//         let file = event.target.files[0];
//         let html = await convertToHtml(file);
//         await convertHtmlToPdf(html);
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileUpload} />
//             {pdfUrl && (
//                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//                     <Viewer fileUrl={pdfUrl} />
//                 </Worker>
//             )}
//         </div>
//     );
// }
// export default DocxToPdfConverter;
