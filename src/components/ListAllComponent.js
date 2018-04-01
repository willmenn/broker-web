import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as BrokerUtils from '../util/BrokerUtil'
import * as ShiftPlaceUtils from '../util/ShiftPlaceUtil'
import dispatcher from '../Dispatcher';

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

    renderBrokerBody() {
        return this.state.list.brokers.map((broker) => {
            return (<tr>
                <td className="has-text-centered"><a title={broker.name}>{broker.name}</a></td>
                <td className="has-text-centered">{broker.email ? broker.email : " sem email"}</td>
                <td className="has-text-centered">{BrokerUtils.convertEnglishDaysToPtBr(broker.preference.weekDay)}</td>
            </tr>)
        })
    }

    renderBrokerHeader() {
        return (
            <tr>
                <th className="has-text-centered" title="Nome">Nome</th>
                <th className="has-text-centered" title="Email">Email</th>
                <th className="has-text-centered" title="Dia de Preferencia">Dia de preferência</th>
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

    onClickLine(spName){
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
                        className={shiftplace.shiftPlaceId === this.state.isSelected || (!this.state.isSelected && index === 0)  ? 'is-selected' : ''}>
                        <td className="has-text-centered"><a title={shiftplace.name}
                                                             onClick={() => this.onClickLine(shiftplace.shiftPlaceId)}>{shiftplace.name}</a></td>
                        <td className="has-text-centered">{shiftplace.address}</td>
                        <td className="has-text-centered">{ShiftPlaceUtils.sumDaysPlaces(shiftplace.days)}
                        </td>
                    </tr>
                )
            })
        } else {
            return this.state.list.shiftplaces.map((shiftplace) => {
                return (<tr>
                    <td className="has-text-centered"><a title={shiftplace.name}>{shiftplace.name}</a></td>
                    <td className="has-text-centered">{shiftplace.address}</td>
                    <td className="has-text-centered">{ShiftPlaceUtils.sumDaysPlaces(shiftplace.days)}
                    </td>
                </tr>)
            })
        }
    }


    renderTable(data) {
        return (
            <div className="column" style={{float: 'left'}}>
                <table className="table table is-striped is-narrow-desktop box">
                    <thead>
                    {!data && this.state.list.brokers.length > 0 ?
                        this.renderBrokerHeader() : this.renderShiftPlaceHeader()}
                    </thead>
                    <tbody>
                    {!data && this.state.list.brokers.length > 0 ?
                        this.renderBrokerBody() : this.renderShiftPlacesBody(data)}
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
