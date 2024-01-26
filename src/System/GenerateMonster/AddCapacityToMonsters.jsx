import capacitiesData from '../../Data/capacity.json'

function AddCapacityToMonsters({ monster }) {
  const randomNumberOfCapacity = Math.floor(Math.random() * 100) + 1

  const getRandomCapacity = (selectedCapacities, monster) => {
    const availableCapacities = capacitiesData.capacities.filter((capacity) => {
      // Check if the capacity meets type and race requirements
      const meetsTypeRequirement =
        !capacity.type.required ||
        (monster.type &&
          monster.type.some((type) => capacity.type.required.includes(type)))

      const meetsRaceRequirement =
        !capacity.race ||
        (monster.race &&
          monster.race.some((race) => capacity.race.includes(race)))

      return (
        meetsTypeRequirement &&
        meetsRaceRequirement &&
        !selectedCapacities.has(capacity)
      )
    })

    if (availableCapacities.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * availableCapacities.length)
    const randomCapacity = availableCapacities[randomIndex]

    selectedCapacities.add(randomCapacity)
    return randomCapacity
  }

  let numCapacities
  if (randomNumberOfCapacity <= 60) {
    numCapacities = 1 // 60% chance for 1 capacity
  } else if (randomNumberOfCapacity <= 86) {
    numCapacities = 2 // 26% chance for 2 capacity
  } else if (randomNumberOfCapacity <= 97) {
    numCapacities = 3 // 11% chance for 3 capacity
  } else {
    numCapacities = 4 // 3% chance for 4 capacity
  }

  const selectedCapacity = new Set()
  const capacities = {}

  for (let i = 1; i <= numCapacities; i++) {
    const randomCapacity = getRandomCapacity(selectedCapacity, monster)

    // Only add the capacity if it is defined (not null or undefined)
    if (randomCapacity !== null && randomCapacity !== undefined) {
      capacities[`capacity${i}`] = randomCapacity
    }
  }
  return capacities
}

export default AddCapacityToMonsters
