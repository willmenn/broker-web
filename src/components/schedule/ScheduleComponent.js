import React, {Component} from 'react';
import ScheduleSaveButtonComponent from './ScheduleSaveButtonComponent';

class ScheduleComponent extends Component {

    constructor(props) {
        super(props)
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
            return (
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
            )
    }

    CreateTableBody() {
        let obj = this.props.schedule.scheduled;
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
