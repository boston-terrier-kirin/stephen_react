import { useEffect, useState } from 'react';
import axios from 'axios';

const Search = (props) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  console.log(results);

  // asyncにはできない。Effect callbacks are synchronous to prevent race conditions. Put the async function inside
  // useEffect(async () => {}, [term]);

  // 解決１
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://ja.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term) {
      search();
    }
  }, [term]);

  // 解決２
  // useEffect(() => {
  //   (async () => {
  //     await axios.get('https://google.com');
  //   })();
  // }, [term]);

  // 解決３
  // useEffect(() => {
  //   axios.get('https://google.com').then((res) => {
  //     console.log(res);
  //   });
  // });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
