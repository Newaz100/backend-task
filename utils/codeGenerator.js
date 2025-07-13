const crypto = require('crypto');

function getLongestIncreasingSubstrings(str) {
  str = str.toLowerCase();
  let substrings = [], maxLen = 0, temp = '', indices = [];

  for (let i = 0; i < str.length; i++) {
    temp = str[i];
    for (let j = i + 1; j < str.length; j++) {
      if (str[j] > str[j - 1]) {
        temp += str[j];
      } else {
        break;
      }
    }

    if (temp.length > maxLen) {
      maxLen = temp.length;
      substrings = [temp];
      indices = [[i, i + temp.length - 1]];
    } else if (temp.length === maxLen) {
      substrings.push(temp);
      indices.push([i, i + temp.length - 1]);
    }
  }

  const mergedSubstring = substrings.join('');
  const start = indices[0][0];
  const end = indices[indices.length - 1][1];
  const hash = crypto.createHash('md5').update(str).digest('hex').slice(0, 8);

  return `${hash}-${start}${mergedSubstring}${end}`;
}

module.exports = getLongestIncreasingSubstrings;
