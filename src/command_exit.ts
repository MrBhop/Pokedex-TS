import type { CLICommand, State } from "./state.js";

export const exitCommand: CLICommand = {
	name: "exit",
	description: "Exits the Pokedex.",
	callback: async function exitCallback(state: State) {
		console.log("Closing the Pokedex... Goodbye!");
		state.readline.close();
		state.pokeApi.closeCache();
		process.exit(0);
	},
}
