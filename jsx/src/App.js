import './App.css';

function App() {
  const name = 'ex: John Doe';

  // Uncaught Error: Objects are not valid as a React child
  // const name = { text: 'ex: John Doe' };

  return (
    <div>
      <label className="label" htmlFor="name">
        Enter name:
      </label>
      <input id="name" type="text" placeholder={name} />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        Click Me!
      </button>
    </div>
  );
}

export default App;
