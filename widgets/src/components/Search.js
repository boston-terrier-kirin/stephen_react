import { useEffect, useState } from 'react';
import axios from 'axios';

const Search = (props) => {
  const [term, setTerm] = useState('stephen curry');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // ■useEffectのasync問題
  // asyncにはできない。Effect callbacks are synchronous to prevent race conditions. Put the async function inside
  // useEffect(async () => {}, [term]);

  // ■missing dependency問題
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://ja.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };

    // 同じ値を入力しなおした場合、debuoncedTermは変わらないので、検索が走らないというメリットあり。
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  // 解決１
  //   useEffect(() => {
  //     const search = async () => {
  //       const { data } = await axios.get('https://ja.wikipedia.org/w/api.php', {
  //         params: {
  //           action: 'query',
  //           list: 'search',
  //           origin: '*',
  //           format: 'json',
  //           srsearch: term,
  //         },
  //       });

  //       setResults(data.query.search);
  //     };

  //     console.log(term, results.length);

  //     // ■missing dependency問題
  //     // React Hook useEffect has a missing dependency: 'results.length'.
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       const timerId = setTimeout(() => {
  //         if (term) {
  //           search();
  //         }
  //       }, 500);

  //       return () => {
  //         // 毎回cleanupされるので、最後に入力してから500ms後に検索が走ることになる。
  //         clearTimeout(timerId);
  //       };
  //     }
  //   }, [
  //     term /*results.lengthを入れてしまうと、lengthが変わったタイミングでも呼び出してしまう。*/,
  //   ]);

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

  // ■CLEANUP
  // useEffect(() => {
  //   console.log('useEffect');
  //   return () => {
  //     // 初回はuseEffectだけが呼ばれる。
  //     // 2回目以降は、cleanup⇒useEffectの順に呼ばれる。
  //     // これは自然な流れで、初回はuseEffectが呼ばれて、cleanupを返す。これでreactにcleanupが伝わったので、以降は、cleanup⇒useEffectの順に呼ばれる。
  //     console.log('cleanup');
  //   };
  // }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://ja.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noreferrer"
            className="ui button"
          >
            GO
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

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
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
