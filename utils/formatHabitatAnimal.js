module.exports = (habitatAnimal, statusKey, continentsKey, biomesKey) => {
	const status = statusKey[habitatAnimal.status];
	const continent = continentsKey[habitatAnimal.continent];
	const biomes = habitatAnimal.biomes.map(habitatAnimalBiome => biomesKey[habitatAnimalBiome]);
	return { 
		name: habitatAnimal.name, 
		status, 
		continent, 
		biomes,
		habitat: habitatAnimal.habitat
	};
};
