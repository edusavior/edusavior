/* eslint-disable indent */
/* eslint-disable no-case-declarations */
const inquirer = require('inquirer');

const io = require('socket.io-client');
const edu = io.connect('http://localhost:3000/edu');

// const userSchema = require('../../src/auth/models/users/user-model');

edu.on('connect', () => {
  const messages = [];
  let name = '';
  let activeInput = true;
  let channel = 'general';
  edu.emit('join', channel);
  edu.on('joined', (joinedChannel) => {
    channel = joinedChannel;
    getInput();
  });
  edu.on('message', (payload) => {
    console.clear();
    messages.push(payload);
    messages.forEach((message) => console.log(message));
    console.log('');
    getInput();
  });

  async function getInput() {
    if (activeInput) {
      return;
    }
    activeInput = true;
    const response = await inquirer.prompt([
      {
        prefix: '',
        name: 'text',
        message: `----------------\n ${channel}`,
      },
    ]);

    const command = response.text.toLowerCase().split(' ')[0];
    switch (command) {
      case 'quit':
        process.exit();
      // eslint-disable-next-line no-fallthrough
      case 'join':
        const room = response.text.toLowerCase().split(' ')[1];
        activeInput = false;
        edu.emit('join', room);
        break;
      default:
        activeInput = false;
        edu.emit('message', `[${name}]: ${response.text}`);
        getInput();
        break;
    }
  }
  // async function getName() {
  //   console.clear();
  //   const input = await inquirer.prompt([
  //     { name: 'name', message: 'write your username' },
  //   ]);
  //   name = input.name;
  //   console.log('input.name', input.name);
  //   let username = await userSchema.findTheUser(name);
  //   if (!username) {
  //     return;
  //   }
  //   console.log('username', username);

  //   activeInput = false;
  //   getInput();
  // }
  // getName();
  async function getName() { 
       console.clear();
       const input = await inquirer.prompt([ 
      { name: 'name', message: 'What is your name?' }, 
      ]); 
      name = input.name;  
      activeInput = false; 
     getInput();  }  getName();



});