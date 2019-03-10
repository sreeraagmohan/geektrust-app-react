import React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap/lib';
import { connect } from 'react-redux';

class Selector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        this.setState({loaded: true})
    }
    
    handlePlanetSelect = () => {
        this.props.dispatch({ 
            type: 'SELECT_PLANET', 
            armyID: this.props.armyID, 
            planet: this.selectPlanet.value 
        });
    };

    handleVehicleSelect = () => {
        this.props.dispatch({ 
            type: 'SELECT_VEHICLE', 
            armyID: this.props.armyID, 
            vehicle: this.selectVehicle.value 
        });
    };

    renderContent() {
        return (
            <div>
                <FormGroup controlId='formControlsSelect'>
                    <FormControl
                        onChange={this.handlePlanetSelect}
                        value={this.props.army.planet}
                        componentClass="select"
                        placeholder="Select Planet"
                        inputRef={(ref) => { this.selectPlanet = ref }}
                    >
                        {
                            this.props.army.planet === '' ?
                                <option value='select'>Select Planet</option>
                                :
                                <option value={this.props.army.planet}>{this.props.army.planet}</option>
                        }
                        {
                            this.props.availablePlanets.map((planet, id) =>
                                <option value={planet} key={id + 1}>{planet}</option>
                            )
                        }
                    </FormControl>
                </FormGroup>
                <FormGroup controlId='formControlsSelect'>
                    <FormControl
                        onChange={this.handleVehicleSelect}
                        value={this.props.army.vehicle}
                        componentClass='select'
                        placeholder='Select Vehicle'
                        inputRef={(ref) => { this.selectVehicle = ref }}
                    >
                        {
                            this.props.army.vehicle === '' ?
                                <option value='select'>Select Vehicle</option>
                                :
                                <option value={this.props.army.vehicle}>{this.props.army.vehicle}</option>
                        }
                        {
                            this.props.availableVehicles.map((vehicle, id) =>
                                <option value={vehicle.name} key={id + 1}>{vehicle.name}</option>
                            )
                        }
                    </FormControl>
                </FormGroup>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.renderContent() : null}
            </div>
        )
    }
}


export default connect()(Selector)