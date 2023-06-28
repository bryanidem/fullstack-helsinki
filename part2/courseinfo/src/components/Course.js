const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => (
  <>
    <h1>{name}</h1>
  </>
);

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part part={part} key={part.id} />
        ))}
      </ul>
    </>
  );
};

const Part = ({ part }) => {
  return (
    <>
      <li>
        {part.name} {part.exercises}
      </li>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

export default Course;
