import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  console.log('Header');

  return (
    <div className="ui secondary pointing menu">
      <div className="menu">
        <Link to="/" className="item">
          Streamer
        </Link>
      </div>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
