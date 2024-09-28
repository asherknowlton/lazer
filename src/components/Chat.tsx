import { useState } from "react";

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
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={"Chat to " + contact.name}
        onChange={(e) => {
          setText(e.target.value);
          updateContent(contact, e.target.value);
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
