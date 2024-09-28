import { useState } from "react";
import Chat from "./components/Chat.js";
import ContactList from "./components/ContactList.js";
import "./assets/css/App.css";

interface contactI {
  id: number;
  name: string;
  email: string;
}

export default function Messenger() {
  const [to, setTo] = useState<contactI>(contacts[0]);
  const [contentMap, setContentMap] = useState(new Map());
  const updateContent = (to: contactI, message: string) => {
    setContentMap(new Map(contentMap).set(to, message));
  };

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact: contactI) => setTo(contact)}
      />
      <Chat
        key={to.id}
        contact={to}
        content={contentMap.get(to)}
        updateContent={updateContent}
      />
    </div>
  );
}

const contacts: contactI[] = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];
