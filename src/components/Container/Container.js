import React from 'react';
import { connect } from 'react-redux';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import Result from '../Result/Result';

// Styles
import './Container.scss';

class Container extends React.Component {

    handleResetBtnClick = () => {
        this.props.dispatch({ type: 'RESET_APP' });
    }

    renderComponent() {
        return (
            <div id="wrapper">
                <Header />
                <div className="main">
                    {this.props.armySent ?
                        <Result /> : <Search />
                    }
                </div>
                <Footer />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.initialized ? this.renderComponent() : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.initialized,
        armySent: state.armySent
    }
}

export default connect(mapStateToProps)(Container);