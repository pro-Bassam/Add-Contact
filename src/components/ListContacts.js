import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListContacts = ({ contacts: allContacts, onDeleteContact }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const clearQuery = () => {
    updateQuery("");
  };

  const contacts =
    query === ""
      ? allContacts
      : allContacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search Contacts"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
        <Link to={"/create"} className="add-contact">
          Add Contact
        </Link>
      </div>

      {query !== "" ? (
        <div className="showing-contacts">
          <span>
            Now showing {contacts.length} of {allContacts.length}
          </span>
          <button onClick={clearQuery}>show all</button>
        </div>
      ) : (
        ""
      )}

      <ol className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div
              className="contact-avatar"
              style={{ backgroundImage: `url(${contact.avatarURL})` }}
            ></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button
              className="contact-remove"
              onClick={() => onDeleteContact(contact)}
            ></button>
          </li>
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ListContacts;
