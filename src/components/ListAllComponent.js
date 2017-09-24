import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as BrokerUtils from '../util/Broker-util'

const customizedCss = {
    margin: 'auto'
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


    renderTable() {
        return (<div className="box">
            <table className="table table is-striped is-narrow-desktop">
                <thead>
                <tr>
                    <th title="Nome">Nome</th>
                    <th title="Email">Email</th>
                    <th title="Dia de Preferencia">Dia de preferência</th>
                </tr>
                </thead>
                <tbody>
                {this.state.list.brokers.map((broker) => {
                    return (<tr>
                        <td className="has-text-centered"><a title={broker.name}>{broker.name}</a></td>
                        <td className="has-text-centered">{broker.email ? broker.email : " sem email"}</td>
                        <td className="has-text-centered">{BrokerUtils.convertEnglishDaysToPtBr(broker.preference.weekDay)}</td>
                    </tr>)
                })
                }
                </tbody>
            </table>
        </div>)
    }

    render() {
        return (
            <div>
                {this.state.list.loading ?
                    this.loadingState() :
                    this.renderTable()}
            </div>
        )

    }
}

export default ListAllComponent;
