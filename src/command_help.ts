import type { CLICommand, State } from "./state.js";

export const helpCommand: CLICommand = {
	name: "help",
	description: "Displays a help message.",
	callback: async function helpCallback(state: State) {
		console.log();
		console.log("Welcome to the Pokedex!");
		console.log("Usage:");
		console.log();

		for (const command of Object.values(state.commands)) {
			console.log(`${command.name}: ${command.description}`);
		}
		console.log();
	},
}
