import Accordion from './components/Accordion';
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

const App = () => {
  return (
    <div>
      <Accordion items={items} />
      <Search />
    </div>
  );
};

export default App;
