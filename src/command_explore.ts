import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error("Usage: explore <area_name>")
	}
	const [area_name, ] = args;

	const location = await state.pokeApi.fetchLocation(area_name);
	const encounters = location.pokemon_encounters;

	console.log(`Exploring ${area_name}...`);
	if (encounters.length === 0) {
		console.log("No Pokemon found")
		return;
	}
	console.log(`Found Pokemon:`);
	for (const encounter of encounters) {
		console.log(`- ${encounter.pokemon.name}`);
	}
}
