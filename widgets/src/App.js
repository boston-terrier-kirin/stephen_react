import { useState } from 'react';
import Accordion from './components/Accordion';
import Dropdown from './components/Dropdown';
import Search from './components/Search';

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

  return (
    <div onClick={() => /*event bubble調査用*/ console.log('app.click')}>
      {/*
      <Accordion items={items} />
      <Search />
      */}
      <Dropdown
        selected={selected}
        onSelectionChange={setSelected}
        options={options}
      />
    </div>
  );
};

export default App;
