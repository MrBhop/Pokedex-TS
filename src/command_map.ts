import type { CLICommand, State } from "./state.js";

export const mapCommand: CLICommand = {
	name: "map",
	description: "List next page of locations.",
	callback: async function mapCallback(state: State) {
		const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);

		state.nextLocationsURL = locations.next;
		state.prevLocationsURL = locations.previous;

		for (const location of locations.results) {
			console.log(location.name);
		}
	},
}

export const mapbCommand: CLICommand = {
	name: "mapb",
	description: "List previous page of locations.",
	callback: async function mapbCallback(state: State) {
		if (!state.prevLocationsURL) {
			console.log("you're on the first page.");
			return;
		}

		const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);

		state.nextLocationsURL = locations.next;
		state.prevLocationsURL = locations.previous;

		for (const location of locations.results) {
			console.log(location.name);
		}
	},
}
