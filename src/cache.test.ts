import { expect, test } from "vitest";
import { Cache } from "./pokecache";

test.concurrent.each([
	{
		key: "key 1",
		value: "test 1",
		interval: 500,
	},
	{
		key: "key 2",
		value: "test 2",
		interval: 1000,
	},
])("Test Caching $interval ms", async ({key, value, interval}) => {
	const cache = new Cache(interval);
	
	cache.add(key, value);
	const cached = cache.get(key);
	expect(cached).toBe(value);

	await new Promise((resolve) => setTimeout(resolve, interval + 100));
	const reaped = cache.get(key);
	expect(reaped).toBe(undefined);

	cache.stopReapLoop();
});
