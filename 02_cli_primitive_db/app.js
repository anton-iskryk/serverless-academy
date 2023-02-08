import inquirer from 'inquirer';
import { readFile, writeFile } from 'fs/promises';

const user = { name: '', age: '', gender: '' };

const getUserName = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'userName',
        message: 'Please, write your name or press Enter to stop adding and find the user: '
      }
    ])
    .then((answer) => {
      if (answer.userName) {
        user.name = answer.userName;
        getUserGender();
      } else {
        findUserQuestion();
      }
    });
};

const getUserGender = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'userGender',
        message: 'What is your gender?',
        choices: ['male', 'female']
      }
    ])
    .then((answer) => {
      if (answer.userGender) {
        user.gender = answer.userGender;
        getUserAge();
      }
    });
};

const getUserAge = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'userAge',
        message: 'Please, write your age: ',
        validate (answer) {
          if (Number(answer)) {
            return true;
          } else {
            return 'Please write a number';
          }
        }
      }
    ])
    .then((answer) => {
      if (answer.userAge) {
        user.age = answer.userAge;
        addUser();
        getUserName();
      } else {
        console.log('Try again later');
      }
    });
};

const addUser = async () => {
  try {
    const data = await readFile('./users.txt', 'utf8');

    const parsedData = JSON.parse(data);

    const newData = [...parsedData, user];

    await writeFile('./users.txt', JSON.stringify(newData), 'utf8');
  } catch (err) {
  }
};

const findUserQuestion = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'wantFindUser',
        message: 'Do you want to find a user?'
      }
    ])
    .then((answer) => {
      if (answer.wantFindUser === true) {
        searchUser();
      } else {
        console.log('Bye, have a great time!');
      }
    });
};

const searchUser = async () => {
  try {
    const data = await readFile('./users.txt', 'utf8');
    const parsedData = JSON.parse(data);

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'searchUser',
          message: 'Write the user\'s name: '
        }
      ])
      .then((answer) => {
        const userFound = parsedData.find(user => user.name.toLowerCase() === answer.searchUser.toLowerCase());

        if (userFound) {
          console.log(`User ${answer.searchUser} was found! Congrats!`);
          console.log(userFound);
        } else {
          console.log('This user does not exist :(');
        }
      });
  } catch (err) {
    console.log('Something went wrong :(');
  }
};

getUserName();
