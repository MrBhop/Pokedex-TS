import type { CLICommand } from "./command.js";

export function commandExit(_: Record<string, CLICommand>) {
	console.log("Closing the Pokedex... Goodbye!");
	process.exit(0);
}
