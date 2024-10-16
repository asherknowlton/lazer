import classNames from "classnames";
import "assets/css/contactList.scss";
import { useAuth } from "src/hooks/useAuth";
import NewContactSearch from "./NewContactSearch";

interface contactI {
  id: string;
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
  const auth = useAuth();

  // const search = async () => {
  //   const response = await auth
  //     .searchForUsers("BILLy")
  //     .then((data: any) =>
  //       data.map((user) => console.log(user.name, user._id))
  //     );
  // };
  // search();

  return (
    <>
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
      <NewContactSearch />
    </>
  );
}
