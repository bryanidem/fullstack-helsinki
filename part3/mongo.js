const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as ");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://carita:${password}@learninghelsinky.ed9sp0d.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const phone = process.argv[4];

  const person = new Person({
    name: name,
    number: phone,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
}
