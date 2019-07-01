import distanceInWords from "date-fns/distance_in_words";

export function truncate(
  words: string,
  truncateLen: number,
  trailingElem?: any
) {
  if (words.length > truncateLen) {
    const returnSet = words.slice(0, truncateLen);
    return `${returnSet} ${trailingElem}`;
  } else {
    return words;
  }
}

export const getTimeWords = (dateString: string) => {
  return distanceInWords(new Date(dateString), new Date()).toUpperCase();
};
