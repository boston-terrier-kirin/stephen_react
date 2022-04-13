import faker from '@faker-js/faker';
import CommentDetail from './CommentDetail';

function App() {
  return (
    <div className="ui container comments">
      <CommentDetail
        author="Sam"
        timeAgo="Today at 6:00PM"
        content="Nice blog post!"
        avatar={faker.image.avatar()}
      />
      <CommentDetail
        author="Alex"
        timeAgo="Today at 2:00PM"
        content="React is awesome"
        avatar={faker.image.avatar()}
      />
      <CommentDetail
        author="Jane"
        timeAgo="Yesterday at 6:00PM"
        content="Which do you like?"
        avatar={faker.image.avatar()}
      />
    </div>
  );
}

export default App;
