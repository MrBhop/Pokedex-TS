import type { CLICommand, State } from "./state.js";

export const catchCommand: CLICommand = {
	name: "catch",
	description: "Attempt to catch a pokemon",
	callback: async function(state: State, ...args: string[]) {
		if (args.length !== 1) {
			throw new Error(`Usage: ${this.name} <pokemon>`);
		}

		const [pokemonName, ] = args;
		const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
		const success = catchWasSuccessful(pokemon.base_experience);
		if (success) {
			state.pokeDex[pokemonName] = pokemon;
		}

		console.log(`Throwing Pokeball at ${pokemonName}...`);
		console.log(`${pokemonName} ${success ? "was caught" : "escaped"}!`);
	},
};

function catchWasSuccessful(baseExp: number) {
	const randomInt = Math.floor(Math.random() * baseExp);
	return randomInt > (baseExp / 2);
}
