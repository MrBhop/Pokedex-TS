import { createInterface } from "node:readline";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
	return input
		.toLowerCase()
		.trim()
		.split(" ")
		.filter(word => word !== "");
}

export function startREPL() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	const commands = getCommands();

	rl.prompt();

	rl.on("line", (input) => {
		const words = cleanInput(input);
		if (words.length === 0) {
			rl.prompt();
			return;
		}

		const commandName = words[0];
		const command = commands[commandName];
		if (!command) {
			console.log(`Unknown command: ${commandName}. Type "help" for a list of commands.`);
			rl.prompt();
			return;
		}

		try {
			command.callback(commands);
		} catch (e) {
			console.log(e);
		}

		rl.prompt();
	});
}
