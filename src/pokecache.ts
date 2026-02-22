type CacheEntry<T> = {
	createdAt: number;
	value: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop();
	}

	add<T>(key: string, value: T) {
		this.#cache.set(key, {
			createdAt: Date.now(),
			value: value,
		} as CacheEntry<T>);
	}

	get<T>(key: string): T | undefined {
		const entry = this.#cache.get(key);
		if (!entry) {
			return undefined;
		}
		return entry.value;
	}

	#reap() {
		// everything before this should ge repaed.
		const cutOffTime = Date.now() - this.#interval;

		const keysToDelete = this.#cache.entries().filter(([, { createdAt }]) => {
			return createdAt < cutOffTime;
		});

		for (const [key,] of keysToDelete) {
			this.#cache.delete(key);
		}
	}

	#startReapLoop() {
		this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
	}

	stopReapLoop() {
		if (this.#reapIntervalId) {
			clearInterval(this.#reapIntervalId);
			this.#reapIntervalId = undefined;
		}
	}
};
