import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap, commandMapb } from "./command_map.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => Promise<void>;
};


export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeApi: PokeAPI;
	prevLocationsURL: string | null;
	nextLocationsURL: string | null;
};

export function initState(): State {
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
				description: "List next page of locations",
				callback: commandMap,
			},
			mapb: {
				name: "mapb",
				description: "List previous page of locations",
				callback: commandMapb,
			},
		},
		pokeApi: new PokeAPI(),
		nextLocationsURL: null,
		prevLocationsURL: null,
	}
}
