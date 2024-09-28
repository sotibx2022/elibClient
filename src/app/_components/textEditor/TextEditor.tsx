"use client";
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
interface AIRequest {
  prompt: string;
  context?: string;
}
interface RespondWith {
  string: (callback: () => Promise<string>) => void;
  json: (callback: () => Promise<object>) => void;
}
// Props for the TextEditor component
interface TextEditorProps {
  displayValue: (value: boolean) => void;
  onPublish:(file:File) =>void;
}
const TextEditor: React.FC<TextEditorProps> = ({ displayValue,onPublish }) => {
  const [showEditor, setShowTextEditor] = useState(true);
  const handleCancel = () => {
    setShowTextEditor(false);
    displayValue(false); 
  };
  const handlePublish = (content: string) => {
    // Initialize jsPDF
    const doc = new jsPDF();
    // Add HTML content to the PDF (with formatting)
    doc.html(content, {
      callback: function (doc) {
        // Convert PDF to a Blob object
        const pdfBlob = doc.output('blob');
        // Convert Blob to File
        const pdfFile = new File([pdfBlob], 'document.pdf', { type: 'application/pdf' });
        onPublish(pdfFile);
        displayValue(false);
      },
      x: 10,
      y: 10,
    });
  };
  const handlePreview = (content:string) => {
   // Initialize jsPDF
   const doc = new jsPDF();
   // Add HTML content to the PDF (with formatting)
   doc.html(content, {
     callback: function (doc) {
       // Convert PDF to a Blob object
       const pdfBlob = doc.output('blob');
       // Create a URL for the Blob and open it in a new window (or preview in iframe)
       const pdfUrl = URL.createObjectURL(pdfBlob);
       window.open(pdfUrl, '_blank'); // Open in a new tab
     },
     x: 10,
     y: 10,
   });
  };
  return (
    <div className='absolute w-[100vw] h-[100vh] top-0 left-0'>
      {showEditor && (  // Conditional rendering of the editor based on state
        <>
          <Editor
            apiKey='kkelsesauu8p6xmdgy4ih56l23vkgharpxpl93o0l140q7aj'
            init={{
              width: '100%',
              height: '100%',
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | Cancel Publish Preview| spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | ',
              // Set up custom buttons for "Cancel" and "Publish"
              setup: (editor) => {
                editor.ui.registry.addButton('Cancel', {
                  text: 'Cancel',
                  onAction: () => {
                    handleCancel();  // Handle Cancel action
                  },
                });
                editor.ui.registry.addButton('Publish', {
                  text: 'Publish',
                  onAction: () => {
                    const content = editor.getContent()
                    handlePublish(content)
                  },
                });
                editor.ui.registry.addButton('Preview',{
                  text:'Preview',
                  onAction:()=>{
                    const content = editor.getContent();
                    handlePreview(content)
                  }
                })
              },
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request: AIRequest, respondWith: RespondWith) => {
                respondWith.string(() => Promise.reject('See docs to implement AI Assistant'));
              },
            }}
            initialValue="Welcome to TinyMCE!"
          />
          <div className="buttonArea">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={() => console.log("Publish clicked!")}>Publish</Button>
          </div>
        </>
      )}
    </div>
  );
};
export default TextEditor;
