import { SyntheticEvent, useState, useCallback } from "react";
import "assets/css/Chat.scss";
import lightningBolt from "assets/lightning-bolt.svg";

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
  const [text, setText] = useState(content);

  const onContentChange = useCallback((e: SyntheticEvent) => {
    //TODO: sanitize
    // const sanitizeConf = {
    //   allowedTags: ["b", "i", "a", "p"],
    //   allowedAttributes: { a: ["href"] },
    // };
    //setText(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));

    setText(e.currentTarget.innerHTML);
    updateContent(contact, e.currentTarget.innerHTML);
  }, []);

  return (
    <section className="chat">
      <div
        contentEditable
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: text }}
        className="main-text-entry"
        role="textbox"
        onBlur={onContentChange}
      />
      <button className="beam-button">
        <img src={lightningBolt} /> Beam to {contact.name}
      </button>
    </section>
  );
}
