const initialState = {
    initialized: true,
    token: '',
    planets: [],
    vehicles: [],
    armyCount: 4,
    armies: [],
    availablePlanets: [],
    availableVehicles: [],
    armyTemplate : {planet:'', vehicle: ''},
    searchTime: 0,
    updateSearchTime: false,
    armyReady: false,
    armyResult: {},
    armySent: false,
    awaitingResult: true,
}

export default initialState;