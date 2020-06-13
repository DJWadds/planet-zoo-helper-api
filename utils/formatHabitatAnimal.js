module.exports = (habitatAnimal, statusKeys, continentKeys, biomeKeys) => {
	const status = statusKeys[habitatAnimal.status];
	const continent = continentKeys[habitatAnimal.continent];
	const biomes = habitatAnimal.biomes.map(biome => biomeKeys[biome]);
	console.log(habitatAnimal);
	return { 
		...habitatAnimal,
		status,
		continent,
		biomes
	};
};
