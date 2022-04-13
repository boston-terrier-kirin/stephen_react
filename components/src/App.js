import faker from '@faker-js/faker';
import ApprovalCard from './ApprovalCard';
import CommentDetail from './CommentDetail';

function App() {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          timeAgo="Today at 6:00PM"
          content="Nice blog post!"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Alex"
          timeAgo="Today at 2:00PM"
          content="React is awesome"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Jane"
          timeAgo="Yesterday at 6:00PM"
          content="Which do you like?"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
    </div>
  );
}

export default App;
