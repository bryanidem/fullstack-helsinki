import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePerson = (id, name) => {
    const filteredPersons = persons.filter((person) => person.id !== id);

    if (window.confirm(`Are you sure you want to remove ${name}`)) {
      personService
        .remove(id)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setPersons(filteredPersons);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personExists = persons.filter((person) => person.name === newName)[0];
    if (personExists) {
      if (
        window.confirm(
          `${personExists.name} is already added to the phonebook, you want to replace the old number ${personExists.number} for the new one ${newNumber}?`
        )
      ) {
        personService
          .update(personExists.id, {
            ...personExists,
            number: newNumber,
          })
          .then((response) => {
            const personsEdited = [...persons];
            personsEdited[personsEdited.indexOf(personExists)].number =
              response.number;
            setPersons(personsEdited);
            setNewName("");
            setNewNumber("");
            setMessage(`${response.name} number has been edited`);
          });
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(newObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setMessage(`${response.name} has been Added to the phonebook`);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input value={props.searchTerm} onChange={props.handleSearchTermChange} />
    </div>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    border: "2px solid green",
    padding: "10px",
    fontSize: "22px",
    margin: "10px 0",
  };

  if (message === null) {
    return null;
  } else {
    return <div style={notificationStyle}>{message}</div>;
  }
};

export default App;
