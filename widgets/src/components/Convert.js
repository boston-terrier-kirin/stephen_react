import { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from '../environment';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: language.value,
            key: environment.accessKey,
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, text]);

  return <div>{translated}</div>;
};

export default Convert;
