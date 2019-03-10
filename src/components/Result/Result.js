import React from 'react';
import { connect } from 'react-redux';

import './Result.scss';

class Result extends React.Component {

    renderResult() {
        if (this.props.status) {
            return (
                <div className="container text-center">
                    <span className="status">Success!</span>
                    <p className="subtext">Congratulations on finding Falcone in {this.props.planet_name}. <br/> King Shan is mighty pleased.</p> 
                </div> 
            )
        } else {
            return (
                <div className="container text-center">
                    <span className="status">Failure!</span>
                    <p className="subtext">Uh oh! Your search for Falcone was unsuccessful.</p>  
                </div>          
            )
        } 
    }
    
    render() {
        return (
            <div className="result">
                {!this.props.awaitingResult ? this.renderResult() : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        awaitingResult: state.awaitingResult,
        status: state.armyResult.status,
        planet_name: state.armyResult.planet_name
    }
}

export default connect(mapStateToProps)(Result);