import { createInterface, type Interface } from "node:readline";
import { exitCommand } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { mapCommand, mapbCommand } from "./command_map.js";
import { Cache } from "./pokecache.js";
import { exploreCommand } from "./command_explore.js";
import { catchCommand } from "./command_catch.js";
import { inspectCommand } from "./command_inspect.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};


export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeApi: PokeAPI;
	pokeDex: Record<string, Pokemon>;
	prevLocationsURL: string | null;
	nextLocationsURL: string | null;
};

export function initState(interval: number): State {
	return {
		readline: createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: "Pokedex > ",
		}),
		commands: {
			exit: exitCommand,
			help: helpCommand,
			map: mapCommand,
			mapb: mapbCommand,
			explore: exploreCommand,
			catch: catchCommand,
			inspect: inspectCommand,
		},
		pokeApi: new PokeAPI(new Cache(interval)),
		pokeDex: {},
		nextLocationsURL: null,
		prevLocationsURL: null,
	}
}
