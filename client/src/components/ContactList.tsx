import classNames from "classnames";
import "assets/css/contactList.scss";

interface contactI {
  id: number;
  name: string;
  email: string;
}

interface ContactListProps {
  selectedContact: contactI;
  contacts: contactI[];
  onSelect: (contact: contactI) => void;
}

export default function ContactList({
  selectedContact,
  contacts,
  onSelect,
}: ContactListProps) {
  return (
    <section className="contact-list">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={classNames({
            contact: true,
            selected: contact === selectedContact ? true : false,
          })}
          onClick={() => {
            onSelect(contact);
          }}
        >
          {contact.name}
        </div>
      ))}
    </section>
  );
}
