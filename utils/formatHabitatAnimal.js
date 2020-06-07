module.exports = (habitatAnimal, statusKeys, continentsKeys, biomesKeys) => {
	const status = statusKeys[habitatAnimal.status];
	const continent = continentsKeys[habitatAnimal.continent];
	const biomes = habitatAnimal.biomes.map(habitatAnimalBiome => biomesKeys[habitatAnimalBiome]);
	return { 
		name: habitatAnimal.name, 
		status, 
		continent, 
		biomes,
		habitat: habitatAnimal.habitat
	};
};
