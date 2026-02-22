import type { CLICommand, State } from "./state.js";

export const exploreCommand: CLICommand = {
	name: "explore",
	description: "List Pokemon encounters for an area.",
	callback: async function exploreCallback(state: State, ...args: string[]) {
		if (args.length !== 1) {
			throw new Error(`Usage: ${this.name} <area_name>`)
		}
		const [areaName,] = args;

		const location = await state.pokeApi.fetchLocation(areaName);
		const encounters = location.pokemon_encounters;

		console.log(`Exploring ${areaName}...`);
		if (encounters.length === 0) {
			console.log("No Pokemon found")
			return;
		}
		console.log(`Found Pokemon:`);
		for (const encounter of encounters) {
			console.log(`- ${encounter.pokemon.name}`);
		}
	},
}
