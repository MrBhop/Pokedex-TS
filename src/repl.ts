import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
	return input
		.toLowerCase()
		.trim()
		.split(" ")
		.filter(word => word !== "");
}

export function startREPL() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "> ",
	});

	rl.prompt();

	rl.on("line", (input) => {
		const cleanedInput = cleanInput(input);
		if (cleanedInput.length === 0) {
			rl.prompt();
			return;
		}
		console.log("Your command was:", cleanedInput[0]);
		rl.prompt();
	});
}
