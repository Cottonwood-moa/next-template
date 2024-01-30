import { useEffect, useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { SpiralType, WordCloudProps, WordData } from '@@/components/common/wordCloud.model';

export default function WordCloud({ width, height, words }: WordCloudProps) {
  const [spiralType, _setSpiralType] = useState<SpiralType>('archimedean');
  const [withRotation, _setWithRotation] = useState(false);
  const [parsedWords, setParsedWords] =
    useState<{ text: string; value: number }[]>(null);

  const colors = ['#143059', '#2F6B9A', '#82a6c2'];

  const getRotationDegree = () => {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  };

  const wordFreq = (text: string): WordData[] => {
    const forParsingWord: string[] = text.replace(/\./g, '').split(/\s/);
    const freqMap: Record<string, number> = {};
    forParsingWord.forEach((w) => {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    });
    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  };

  const fixedValueGenerator = () => 0.5;

  const fontSizeSetter = (datum: WordData) =>
    scaleLog({
      domain: [
        Math.min(...parsedWords.map((w) => w.value)),
        Math.max(...parsedWords.map((w) => w.value)),
      ],
      range: [10, 100],
    })(datum.value);

  useEffect(() => {
    if (words) {
      const freqWord = wordFreq(words);
      setParsedWords(freqWord);
    }
  }, [words]);

  return (
    <div className="wordcloud">
      {parsedWords ? (
        <Wordcloud
          words={parsedWords}
          width={width}
          height={height}
          fontSize={fontSizeSetter}
          font="Impact"
          padding={2}
          spiral={spiralType}
          rotate={withRotation ? getRotationDegree : 0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor="middle"
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      ) : <span className="loading loading-infinity loading-lg" />}
    </div>
  );
}
