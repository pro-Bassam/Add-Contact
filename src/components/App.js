import "../css/App.css";
import ListContacts from "./ListContacts";
import { useEffect, useState } from "react";
import * as ContactsAPI from "../utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route, Routes, useNavigate } from "react-router-dom";
const App = () => {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };

    getContacts();
  }, []);

  const removeContact = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id));
    ContactsAPI.remove(contact);
  };

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };
    create();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/create"
        element={<CreateContact onCreateContact={createContact} />}
      />
      <Route
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={removeContact} />
        }
      />
    </Routes>
  );
};

export default App;
