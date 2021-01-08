const io = require('socket.io-client');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// write your code here

rl.question(`What is your name? \n`, (name) => {
	const socket = io('http://localhost:3000');
	socket.on('connect', () => {
		console.log(`Successfully connected to Server.`);
		message(socket, name);
	});
	socket.on('disconnect', () => {
		console.log(`Connection lost...`);
		message(socket, name);
	});
	socket.on('simple chat message', (msg) => {
		console.log(msg);
		message(socket, name);
	});
});

function message(socket, name) {
	rl.question('> ', (msg) => {
		socket.emit('simple chat message', `${name} says "${msg}"`);
		console.log(`Sending Message: "${msg}"`);
		message(socket, name);
	});
}
