const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sortAlphabetically = (value) => {
  return value.sort((a, b) => a.localeCompare(b)).join(' ');
};

const sortNumbersAsc = (value) => {
  return value.sort((a, b) => a - b).join(' ');
};

const sortNumbersDesc = (value) => {
  return value.sort((a, b) => b - a).join(' ');
};

const sortByWordLength = (value) => {
  return value.sort((a, b) => a.length - b.length).join(' ');
};

const uniqueValues = (value) => {
  return Array.from(new Set(value)).join(' ');
};

const game = () => {
  rl.question('Enter a few words or digits dividing them in spaces: ', (words) => {
    const arrayOfWords = words.split(' ');

    if (words === '') {
      console.log('Don\'t leave the line empty!');
      return game();
    }

    if (words.split(' ').length < 2) {
      console.log('Please write the words correctly!');
      game();
      return;
    }

    rl.question(
      'Choose the letter of an operation or type \'exit\' to quit the game:\n a. Sort words alphabetically \n b. Show numbers from lesser to greater \n c. Show numbers from bigger to smaller \n d. Display words in ascending order by number of letters in the word \n e. Show only unique words \n f. Display only unique values from the set of words and numbers. \n Enter a letter to choose an operation: ',
     (option) => {

      switch (option) {
        case 'a':
          console.log(sortAlphabetically(arrayOfWords));

          return game();
        case 'b':
          console.log(sortNumbersAsc(arrayOfWords));

          return game();
        case 'c':
          console.log(sortNumbersDesc(arrayOfWords));

          return game();
        case 'd':
          console.log(sortByWordLength(arrayOfWords));

          return game();
        case 'e':
          console.log(uniqueValues(arrayOfWords));

          return game();
        case 'f':
          console.log(uniqueValues(arrayOfWords));

          return game();
        case 'exit':
          break;
      
        default:
          console.log('Type the option correctly!');
          return game();
      }

      rl.close();
    })
  });
};

game();
