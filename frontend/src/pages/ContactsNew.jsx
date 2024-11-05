import FormAddContact from "../components/FormAddContact";

function ContactsNew() {
  return (
    <div className="flex flex-col w-full p-3 gap-3">
      <div className="flex flex-1 items-center">
        <h1>New Contact</h1>
      </div>
      <FormAddContact />
    </div>
  );
}

export default ContactsNew;
