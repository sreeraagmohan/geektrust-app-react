import React from 'react';
import { connect } from 'react-redux';
import './Search.scss';

import Selector from '../Selector/Selector';
import {requestFindFalcone} from '../../actions/';

class Search extends React.Component {

    componentDidUpdate() {
        if(this.props.updateSearchTime)
            this.props.dispatch({type:'UPDATE_SEARCHTIME'});
    }

    handleSendArmyBtnClick = (e) => {
        this.props.dispatch(requestFindFalcone());
    }

    getSelectors() {
        return [0, 1, 2, 3].map(id => (
            <div key={id} className="col-xs-12 col-md-3">
                <div className="card mb-4">
                    <div className="card-header">
                        Army {id + 1}
                    </div>
                    <div className="card-body">
                        <Selector
                            armyID={id}
                            availablePlanets={this.props.availablePlanets}
                            availableVehicles={this.props.availableVehicles}
                            army={this.props.armies[id]}
                        />
                    </div>
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div className="search">
                <div className="find-header">
                    <p className="lead">Select the planets you want to search in</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card-deck mb-3 text-center">
                            {this.getSelectors()}
                        </div>
                    </div>
                    <div className="row status-row">
                        <div className="col-md-6 float-left">
                            <h3>You will get there in {this.props.searchTime} light years.</h3>
                        </div>
                        <div className="col-md-6">
                            <button disabled={!this.props.armyReady} onClick={(e) => this.handleSendArmyBtnClick(e)} className="pull-right find-button">Find Falcone!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        updateSearchTime: state.updateSearchTime,
        searchTime: state.searchTime,
        armyReady: state.armyReady,
        armyCount: state.armyCount,
        armies: state.armies,
        availablePlanets: state.availablePlanets,
        availableVehicles: state.availableVehicles
    }
}

export default connect(mapStateToProps)(Search);