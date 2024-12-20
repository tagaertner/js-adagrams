import letterPool  from './letterPool.js';
import scoreChart from './scoreChart.js';


export const drawLetters = () => {
  // Implement this method for wave 1
  let hand = []
  let letterCounts = { ...letterPool};

  while (hand.length <10 ){
    let availabeLetters = [];

    for (let letter in letterCounts){
      if (letterCounts[letter]> 0) {
        availabeLetters.push(letter);
      }
    }
    if (availabeLetters.length === 0){
      break
    }
    let index = Math.floor(Math.random() * availabeLetters.length);
    let chooseLetter = availabeLetters[index]
    letterCounts[chooseLetter] -=1;
    hand.push(chooseLetter)
  }
  return hand; 
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  let word = input.toUpperCase()
  let handCopy = [...lettersInHand];

  for (let letter of word){
    let index = handCopy.indexOf(letter);
    if (index === -1){
      return false;
    }
    handCopy.splice(index, 1);
  }
  return true;
};
       
   

export const scoreWord = (word) => {
  // Implement this method for wave 3
  if (! word || word === '')
    return 0;
  
  let totalScore = 0
  word = word.toUpperCase()

  for (let letter of word){
    if (letter in scoreChart){
      totalScore += scoreChart[letter];
    }
  }
  
  if (word.length >= 7){
    totalScore += 8;
  }
  return totalScore

};

export const highestScoreFrom = (words) => {
    let highestScore ={
      word: words[0],
      score:scoreWord(words[0])
    };
    
      for (let word of words) {
        let newScore = scoreWord(word);
        if (newScore > highestScore.score) {
          highestScore = { word: word, score: newScore };
        } else if (newScore === highestScore.score) {
          if (word.length === 10 && highestScore.word.length !== 10) {
            highestScore = { word: word, score: newScore };
          } else if (highestScore.word.length !== 10 && word.length < highestScore.word.length) {
            highestScore = { word: word, score: newScore };
          }
        }
      }
      return highestScore;
    };

