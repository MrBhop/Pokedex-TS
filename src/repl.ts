import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	return input
		.toLowerCase()
		.trim()
		.split(" ")
		.filter(word => word !== "");
}

export function startREPL(state: State) {
	state.readline.prompt();

	state.readline.on("line", (input) => {
		const words = cleanInput(input);
		if (words.length === 0) {
			state.readline.prompt();
			return;
		}

		const commandName = words[0];
		const command = state.commands[commandName];
		if (!command) {
			console.log(`Unknown command: ${commandName}. Type "help" for a list of commands.`);
			state.readline.prompt();
			return;
		}

		try {
			command.callback(state);
		} catch (e) {
			console.log(e);
		}

		state.readline.prompt();
	});
}
