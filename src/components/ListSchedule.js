import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as PanelAction from "../action/PanelAction";

const customizedCss = {
    margin: 'inherit'
}

class ListSchedule extends Component {

    constructor() {
        super()
        this.state = {list: ListAllStore.getDefault()};
    }

    componentWillMount() {
        ListAllStore.on('change', () => {
            this.setState({list: ListAllStore.getAll()});
        })
    }

    visualizeSchedule(manager,id) {
        PanelAction.createPanelAction({
            type: 'ESCALA_VISUALIZATION',
            manager: manager,
            scheduleId: id
        })
    }


    render() {
        return (
            <div style={customizedCss}>
                {this.state.list.schedules && this.state.list.schedules.length > 0 ?
                    <table className="table table is-striped is-narrow-desktop box">
                        <thead>
                        <tr>
                            <th className="has-text-centered" title="Numero">Número</th>
                            <th className="has-text-centered" title="Id">Id</th>
                            <th className="has-text-centered" title="Dia">Dia</th>
                            <th className="has-text-centered" title="Icon"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.list.schedules.map((s, index) => {
                            return (
                                <tr>
                                    <th className="has-text-centered" title="Numero">{index}</th>
                                    <td className="has-text-centered" title="id">{s.id}</td>
                                    <td className="has-text-centered" title="Dia">
                                        {s.timestamp}</td>
                                    <td className="has-text-centered" title="icon">
                                        <a onClick={() => this.visualizeSchedule(s.managerName,s.id)}>
                                            <i className="fa fa-calendar-check-o fa-3x fa-fw"/>
                                        </a>
                                    </td>
                                </tr>

                            )
                        })}
                        </tbody>
                    </table>
                    : <div className="is-half" style={customizedCss}>
                        <i className="fa fa-refresh fa-spin fa-3x fa-fw"/>
                        <span className="sr-only"/>
                    </div>}

            </div>
        )

    }
}

export default ListSchedule;
