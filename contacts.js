const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((parsed) => console.table(parsed));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((parsed) =>
      parsed.find((contact) => contact.id === Number(contactId))
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((parsed) => {
      const filtered = parsed.filter(
        (contact) => contact.id !== Number(contactId)
      );
      if (JSON.stringify(parsed) === JSON.stringify(filtered)) {
        console.log("Error: id is not found!");
      } else {
        fs.writeFile(contactsPath, JSON.stringify(filtered));
        console.log("Removed!");
      }
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  const id = Date.now();
  const contact = {
    id,
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts))
    .then((parsed) => {
      return [...parsed, contact];
    })
    .then((data) => {
      fs.writeFile(contactsPath, JSON.stringify(data));
      console.log(contact.name, "was added to contacts!");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
