import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as BrokerUtils from '../util/BrokerUtil'
import * as ShiftPlaceUtils from '../util/ShiftPlaceUtil'
import dispatcher from '../Dispatcher';
import {buildMap} from "../util/MapUtils";

const customizedCss = {
    margin: 'inherit'
}

class ListAllComponent extends Component {

    constructor() {
        super()
        this.state = {list: ListAllStore.getDefault()};
    }

    componentWillMount() {
        ListAllStore.on('change', () => {
            this.setState({list: ListAllStore.getAll()});
        })
    }

    loadingState() {
        return (
            <div className="is-half" style={customizedCss}>
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                <span className="sr-only"></span>
            </div>
        )
    }

    renderBrokerBody(data) {
        let brokers = data ? data : this.state.list.brokers;
        return brokers.map((broker, index) => {
            return (
                <tr className={(this.props.activeBroker == broker.name && data) ? 'is-selected' : ''}>
                    <td className="has-text-centered"><a onClick={this.props.isSchedule ?
                        () => this.props.changeActiveBroker(broker.name)
                        : null} title={broker.name}>{broker.name}</a>
                    </td>
                    <td className="has-text-centered">{broker.email ? broker.email : " sem email"}</td>
                    {data ? null :
                        <td className="has-text-centered">{broker.qtdConstraints}</td>}
                </tr>)
        })
    }

    renderBrokerHeader(data) {
        return (
            <tr>
                <th className="has-text-centered" title="Nome">Nome</th>
                <th className="has-text-centered" title="Email">Email</th>
                {data ? null : <th className="has-text-centered" title="Dia de Preferencia">Restrições</th>}
            </tr>
        )
    }

    renderShiftPlaceHeader() {
        return (
            <tr>
                <th className="has-text-centered" title="Nome">Nome</th>
                <th className="has-text-centered" title="Enderco">Endereço</th>
                <th className="has-text-centered" title="Lugares">Lugares</th>
            </tr>
        )
    }

    onClickLine(spName) {
        this.setState({isSelected: spName});
        dispatcher.dispatch({
            type: 'CHANGE_SCHEDULE_SHIFTPLACE',
            data: spName
        })

    }

    renderShiftPlacesBody(data) {
        if (data) {
            return data.map((shiftplace, index) => {
                return (
                    <tr
                        className={shiftplace.shiftPlaceId === this.state.isSelected || (!this.state.isSelected && index === 0) ? 'is-selected' : ''}>
                        <td className="has-text-centered"><a title={shiftplace.name}
                                                             onClick={() => this.onClickLine(shiftplace.shiftPlaceId)}>{shiftplace.name}</a>
                        </td>
                        <td className="has-text-centered">{shiftplace.address}</td>
                        <td className="has-text-centered">{shiftplace.places}
                        </td>
                    </tr>
                )
            })
        } else {
            return this.state.list.shiftplaces.map((shiftplace) => {
                return (<tr>
                    <td className="has-text-centered"><a title={shiftplace.name}>{shiftplace.name}</a></td>
                    <td className="has-text-centered">{shiftplace.address}</td>
                    <td className="has-text-centered">{shiftplace.places}
                    </td>
                </tr>)
            })
        }
    }

    createTableStyle(data) {
        if (data) {
            return {float: 'left', fontSize: '0.8rem'}
        } else {
            return {float: 'left'}
        }
    }

    renderTable(data) {
        return (
            <div className="column" style={this.createTableStyle(data || this.props.brokers)}>
                <table className="table table is-striped is-narrow-desktop box">
                    <thead>
                    {this.props.brokers || this.state.list.brokers.length > 0 ?
                        this.renderBrokerHeader(this.props.brokers) : this.renderShiftPlaceHeader()}
                    </thead>
                    <tbody>
                    {this.props.brokers || this.state.list.brokers.length > 0 ?
                        this.renderBrokerBody(this.props.brokers) : this.renderShiftPlacesBody(data)}
                    </tbody>
                </table>
            </div>)
    }

    render() {
        return (
            <div style={this.state.list.loading ? customizedCss : null}>
                {this.state.list.loading ?
                    this.loadingState() :
                    this.renderTable(this.props.shiftPlaces)}
            </div>
        )

    }
}

export default ListAllComponent;
