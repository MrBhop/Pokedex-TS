import type { CLICommand, State } from "./state.js";

export const inspectCommand: CLICommand = {
	name: "inspect",
	description: "Inspect a caught Pokemon.",
	callback: async function(state: State, ...args: string[]) {
		if (args.length !== 1) {
			throw new Error(`Usage: ${this.name} <pokemon>`);
		}

		const [pokemonName, ] = args;

		const pokemon = state.pokeDex[pokemonName];
		if (!pokemon) {
			throw new Error(`You haven't caught ${pokemonName}.`);
		}

		console.log(`Name: ${pokemon.name}`);
		console.log(`Height: ${pokemon.height}`);
		console.log(`Weight: ${pokemon.weight}`);
		console.log(`Stats:`);
		for (const stat of pokemon.stats) {
			console.log(`  - ${stat.stat.name}`);
		}
		console.log(`Types:`);
		for (const t of pokemon.types) {
			console.log(`  - ${t.type.name}`);
		}
	}
}
