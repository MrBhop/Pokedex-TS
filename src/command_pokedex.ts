import type { CLICommand, State } from "./state.js";

export const pokedexCommand: CLICommand = {
	name: "pokedex",
	description: "List caught Pokemon.",
	callback: async function(state: State) {
		console.log("Your Pokedex:")
		for (const key in state.pokeDex) {
			console.log(`  - ${state.pokeDex[key].name}`);
		}
	}
}
