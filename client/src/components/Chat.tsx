import { useState, KeyboardEvent, useMemo } from "react";
import { useAuth } from "hooks/useAuth";
import { BaseEditor, Descendant, createEditor, Node } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import "assets/css/Chat.scss";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface contactI {
  id: number;
  name: string;
  email: string;
}

interface ChatProps {
  contact: contactI;
  content: string;
  updateContent: (to: contactI, message: string) => void;
}

export default function Chat({ contact, content, updateContent }: ChatProps) {
  const auth = useAuth();
  const [chatText, setChatText] = useState(content);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    if (key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (chatText !== "") {
      auth.sendMessage(auth.user.id, contact.id, chatText).then(() => {
        setChatText("");
        clearSlate();
      });
    } else console.log("chat body is empty");
  };

  const clearSlate = () => {
    const point = { path: [0, 0], offset: 0 };
    editor.selection = { anchor: point, focus: point };
    editor.history = { redos: [], undos: [] };
    editor.children = initialValue;
  };

  const serialize = (value: Descendant[]) => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join("\n")
    );
  };

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  return (
    <section className="chat">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            setChatText(serialize(value));
          }
        }}
      >
        <Editable
          className="main-text-entry"
          onKeyDown={handleEnter}
          onSubmit={handleSubmit}
          placeholder={`Draft a transmission to ${contact.name}`}
        />
        <button className="beam-button" onClick={handleSubmit}>
          <svg>
            <use href="/src/assets/icons.svg#lightning-bolt" />
          </svg>
          Beam to {contact.name}
        </button>
      </Slate>
    </section>
  );
}
