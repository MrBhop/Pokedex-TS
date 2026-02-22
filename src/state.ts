import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap, commandMapb } from "./command_map.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};


export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeApi: PokeAPI;
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
			exit: {
				name: "exit",
				description: "Exits the Pokedex.",
				callback: commandExit,
			},
			help: {
				name: "help",
				description: "Displays a help message.",
				callback: commandHelp,
			},
			map: {
				name: "map",
				description: "List next page of locations.",
				callback: commandMap,
			},
			mapb: {
				name: "mapb",
				description: "List previous page of locations.",
				callback: commandMapb,
			},
			explore: {
				name: "explore",
				description: "List Pokemon encounters for an area.",
				callback: commandExplore,
			}
		},
		pokeApi: new PokeAPI(new Cache(interval)),
		nextLocationsURL: null,
		prevLocationsURL: null,
	}
}
