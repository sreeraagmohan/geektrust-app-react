import initialState from '../stores/initialState';
import actionTypes from '../actions/types';

const reducer = (state = initialState, action) => {

    switch(action.type){

        // Initializes App
        case actionTypes.INIT_APP:
            let armies = [];
            for(let i = 0; i< state.armyCount; i++) {
                armies.push(state.armyTemplate);
            }

            state = {
                ...state,
                armies,
                initialized: false
            }
        
        break;

        // Receive API Access Token
        case actionTypes.RECEIVE_TOKEN:

            state = {
                ...state,
                token: action.token
            }
        
        break;

        // Get list of all planets
        case actionTypes.RECEIVE_PLANETS:

            state = {
                ...state,
                planets: action.planets,
                availablePlanets: action.planets.map(planet => planet.name),
                initialized: state.availableVehicles.length > 0
            }
        
        break;

        // Get list of all vehicles
        case actionTypes.RECEIVE_VEHICLES:

            state = {
                ...state,
                vehicles: action.vehicles,
                availableVehicles: action.vehicles,
                initialized: state.availablePlanets.length > 0
            }
        
        break;

        // Select a planet and filter out the rest
        case actionTypes.SELECT_PLANET:

            
            armies = state.armies.slice();

            let selectedArmy = {...armies[action.armyID]};

            selectedArmy.planet = action.planet;
            armies[action.armyID] = selectedArmy;


            let selectedPlanets = armies
                                        .filter(army => army.planet !== '')
                                        .map(army => army.planet);
            
            let availablePlanets = state.planets
                                        .filter(planet => !selectedPlanets.includes(planet.name))
                                        .map(planet => planet.name);
            state = {
                ...state,
                availablePlanets,
                armies,
                updateSearchTime: true
            }

        break;
        
        // Select a vehicle and filter out the rest
        case actionTypes.SELECT_VEHICLE:
            armies = state.armies.slice();
            selectedArmy = {...armies[action.armyID]};

            selectedArmy.vehicle = action.vehicle;
            armies[action.armyID] = selectedArmy;

            let selectedVehicles = armies
                                        .filter(army => army.vehicle !== '')
                                        .map(army => army.vehicle);
            let availableVehicles = state.vehicles
                                        .map(vehicle => {
                                                let used = selectedVehicles.reduce((sum, selectedVehicle) => selectedVehicle === vehicle.name ? sum + 1 : sum,0);
                                                return {...vehicle, total_no: vehicle.total_no - used};
                                        })
                                        .filter(vehicle => vehicle.total_no > 0);

            state = {
                ...state,
                availableVehicles,
                armies,
                updateSearchTime: true
            }

        break;
        
        // Update the time needed
        case actionTypes.UPDATE_SEARCHTIME:
            let searchTime = state.armies
                                    .reduce((sum, army) => {
                                                let distance = state.planets
                                                                    .filter(planet => planet.name === army.planet)
                                                                    .reduce((sum, planet) => sum + planet.distance, 0);

                                                let speed = state.vehicles
                                                                    .filter(vehicle => vehicle.name === army.vehicle)
                                                                    .reduce((sum, vehicle) => sum + vehicle.speed,0);

                                                return distance > 0 && speed > 0 ? sum + distance/speed : sum;
                                    },0);
            let armyReady = state.armies
                                    .reduce((ready, army) => {
                                        return ready && army.planet !== '' && army.vehicle !== '';
                                    },true);

            state = {
                ...state,
                searchTime,
                armyReady,
                updateSearchTime: false
            }
        
        break;

        case actionTypes.REQUEST_SENDARMY:

            state = {
                ...state,
                armySent: true
            }
        
        break;

        case actionTypes.RECEIVE_SENDARMY:
            let armyResult = {...action.data};
            armyResult.status = armyResult.status === 'false' ? false : true;

            console.log(state.awaitingResult, 'asas');

            state = {
                ...state,
                awaitingResult: false,
                armyResult
            };
        
        break;

        default:
            break;
    }
    return state;
}

export default reducer;