"use client";
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@/components/ui/button';
// Define types for the AI request
interface AIRequest {
  prompt: string;
  context?: string;
}
// Define types for the respondWith object
interface RespondWith {
  string: (callback: () => Promise<string>) => void;
  json: (callback: () => Promise<object>) => void;
}
// Props for the TextEditor component
interface TextEditorProps {
  displayValue: (value: boolean) => void;  // Corrected type for displayValue prop
}
const TextEditor: React.FC<TextEditorProps> = ({ displayValue }) => {
  const [showEditor, setShowTextEditor] = useState(true);
  const handleCancel = () => {
    setShowTextEditor(false);
    displayValue(false);  // Correctly passing the boolean value
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
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | cancel publish | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | ',
              // Set up custom buttons for "Cancel" and "Publish"
              setup: (editor) => {
                editor.ui.registry.addButton('cancel', {
                  text: 'Cancel',
                  onAction: () => {
                    handleCancel();  // Handle Cancel action
                  },
                });
                editor.ui.registry.addButton('publish', {
                  text: 'Publish',
                  onAction: () => {
                    const content = editor.getContent();
                    console.log('Publish button clicked. Content:', content);
                    // Example: send content to a server or do something with it
                  },
                });
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
