import { useState } from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Search from './components/Search';
import Translate from './components/Translate';

const items = [
  {
    title: 'What is React',
    content: 'React is frontend javascript framework',
  },
  {
    title: 'Why React',
    content: 'React is favorite framework',
  },
  {
    title: 'How do you use React',
    content: 'I dont know',
  },
];

const options = [
  {
    label: 'The Color Red',
    value: 'red',
  },
  {
    label: 'The Color Green',
    value: 'green',
  },
  {
    label: 'A Shade of Blue',
    value: 'blue',
  },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    // <div onClick={() => /*event bubble調査用*/ console.log('app.click')}>
    <div>
      {/*
      <Accordion items={items} />
      <Search />
      */}
      {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle</button>
      {showDropdown ? (
        <Dropdown
          selected={selected}
          onSelectionChange={setSelected}
          options={options}
        />
      ) : null} */}

      <Translate />
    </div>
  );
};

export default App;
