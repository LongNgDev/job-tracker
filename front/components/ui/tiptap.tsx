"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()), // ✅ output HTML
    editorProps: {
      attributes: {
        class: "min-h-32 rounded-md border p-3 focus:outline-none",
      },
    },
  });

  // ✅ if form value changes (edit mode), update editor
  React.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) editor.commands.setContent(value || "<p></p>");
  }, [value, editor]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
