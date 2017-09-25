import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as BrokerUtils from '../util/Broker-util'

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
            console.log("ListAll: ListAll change")
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

    renderShiftPlacesBody() {
        return this.state.list.shiftplaces.map((shiftplace) => {
            return (<tr>
                <td className="has-text-centered"><a title={shiftplace.name}>{shiftplace.name}</a></td>
                <td className="has-text-centered">{shiftplace.address}</td>
                <td className="has-text-centered">{shiftplace.places}</td>
            </tr>)
        })
    }

    renderTable() {
        return (<div className="box">
            <table className="table table is-striped is-narrow-desktop">
                <thead>
                {this.state.list.brokers.length > 0 ?
                    this.renderBrokerHeader() : this.renderShiftPlaceHeader()}
                </thead>
                <tbody>
                {this.state.list.brokers.length > 0 ?
                    this.renderBrokerBody() : this.renderShiftPlacesBody()}
                </tbody>
            </table>
        </div>)
    }

    render() {
        return (
            <div style={customizedCss}>
                {this.state.list.loading ?
                    this.loadingState() :
                    this.renderTable()}
            </div>
        )

    }
}

export default ListAllComponent;
