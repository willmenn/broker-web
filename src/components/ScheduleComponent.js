import React, {Component} from 'react';
import ScheduleSaveButtonComponent from '../components/ScheduleSaveButtonComponent';
import ListAll from './ListAllComponent'
import ListAllStore from "../store/ListAllStore";
import ScheduleStore from "../store/ScheduleStore";

const customizedCss = {
    margin: 'auto'
}

class ScheduleComponent extends Component {

    constructor() {
        super()
        this.state = {
            list: ListAllStore.getDefault()
        };
    }

    componentDidMount() {
        ListAllStore.on('change', () => {
            this.setState({list: ListAllStore.getAll()});
        })
        ScheduleStore.on('change', () => {
            this.setState({isSelected: ScheduleStore.getAll()});
        })
    }

    containsDay(weekDay, days) {
        let contain = false;
        if (typeof days === 'undefined') {
            return false;
        }
        days.forEach((day) => day === weekDay ? contain = true : false)
        return contain;
    }

    isUndefined(data) {
        if (typeof data === 'undefined') {
            return false;
        }
    }

    render() {
        if (this.props.brokers.length !== 0 && this.props.scheduleWrapper) {
            return (
                <div style={{width: 'inherit'}}>
                    <ListAll shiftPlaces={this.state.list.shiftplaces}/>
                    <table className="table is-striped is-narrow-desktop">
                        <thead>
                        <tr>
                            <th title="SUN">Domingo</th>
                            <th title="MON">Segunda</th>
                            <th title="TUE">Terça</th>
                            <th title="WED">Quarta</th>
                            <th title="THU">Quinta</th>
                            <th title="FRI">Sexta</th>
                            <th title="SAT">Sábado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.CreateTableBody().map(s => s)}
                        </tbody>
                    </table>
                    <ScheduleSaveButtonComponent manager={this.props.managersName}/>
                </div>
            )
        } else {
            return (
                <div className="is-half" style={customizedCss}>
                    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span className="sr-only"></span>
                </div>
            )
        }
    }

    CreateTableBody() {
        let sp = {};
        if (!this.state.isSelected ) {
            sp = this.props.scheduleWrapper.plantaos[0];
        } else {
            this.props.scheduleWrapper.plantaos.forEach(p => {
                if (p.shiftPlaceId === this.state.isSelected.shiftplaceSelected) {
                    sp = p;
                }
            });

        }
        let obj = sp.scheduled;
        var biggest = this.getBiggestObjectWithLength(obj);

        var tableLines = new Array();

        for (let i = 0; i < biggest; i++) {
            tableLines.push(<tr>
                <td className="has-text-centered">{this.validateDay(obj, i, 'SUN')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'MON')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'TUE')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'WED')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'THU')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'FRI')}</td>
                <td className="has-text-centered">{this.validateDay(obj, i, 'SAT')}</td>
            </tr>);
        }
        return tableLines;
    }

    getBiggestObjectWithLength(obj) {
        var biggest = 0;
        Object.keys(obj).forEach(key => {
            if (biggest < obj[key].length) {
                biggest = obj[key].length;
            }
        });
        return biggest;
    }

    validateDay(obj, i, day) {
        if (obj[day].length > 0 && typeof obj[day][i] !== 'undefined') {
            return obj[day][i]['name'];
        } else {
            return '';
        }
    }
}

export default ScheduleComponent;
