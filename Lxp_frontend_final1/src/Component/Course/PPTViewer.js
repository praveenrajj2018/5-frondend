import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndividualContentRequest } from '../../action/Course/FetchIndividualContentByIdAction';
import { fetchContentUrlRequest } from '../../action/Course/FetchContentUrlAction';
export default function PptViewerComponent({ materialId }) {
    const [documentPath, setDocumentPath] = useState('');
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const content = useSelector(state => state.fetchContentUrl.content); // Assuming 'state.content' is where your content data is stored . . . 

    // Dispatch the fetchIndividualContentRequest action
    useEffect(() => {
        dispatch(fetchContentUrlRequest(materialId));
    }, [materialId]);

    // Update documentPath when content is fetched
    useEffect(() => {
        if (content && content.filePath) {
            setDocumentPath(content.filePath);
        }

    }, [content]);

    useEffect(() => {
        const container = containerRef.current;
        let instance, PSPDFKit;
        (async function () {
            if (documentPath) {
                PSPDFKit = await import('pspdfkit');
                PSPDFKit.unload(container);

                instance = await PSPDFKit.load({
                    container,
                    document: documentPath,
                    baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
                });
            }
        })();

        return () => PSPDFKit && PSPDFKit.unload(container);
    }, [documentPath]);

    return (
        <div
            ref={containerRef}
            style={{ width: '45vw', height: '90vh', marginLeft: 10, marginTop: 10 }}
        />
    );
}
