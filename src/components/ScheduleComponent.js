import React, {Component} from 'react';


const customizedCss = {
    margin: 'auto'
}

class ScheduleComponent extends Component {


    containsDay(weekDay, days) {
        let contain = false;
        if (typeof days === 'undefined') {
            return false;
        }
        days.forEach((day) => day === weekDay ? contain = true : false)
        return contain;
    }

    createTable() {


    }

    render() {
        if (this.props.brokers.length !== 0 && this.props.scheduleWrapper.length !== 0) {
            return (
                <div>
                    <table className="table is-striped">
                        <thead>
                        <tr>
                            <th><abbr title="SUN">Domingo</abbr></th>
                            <th><abbr title="MON">Segunda-feira</abbr></th>
                            <th><abbr title="TUE">Terça-feira</abbr></th>
                            <th><abbr title="WED">Quarta-feira</abbr></th>
                            <th><abbr title="THU">Quinta-feira</abbr></th>
                            <th><abbr title="FRI">Sexta-feira</abbr></th>
                            <th><abbr title="SAT">Sábado</abbr></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.brokers.map((broker) => {
                            const map = new Map();
                            let obj = this.props.scheduleWrapper;
                            Object.keys(obj).forEach(key => {
                                map.set(key, obj[key]);
                            });
                            let days = map.get(broker.name);
                            return (<tr>
                                <td>{this.containsDay('SUN', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('MON', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('TUE', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('WED', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('THU', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('FRI', days) ? broker.name : '--'}</td>
                                <td>{this.containsDay('SAT', days) ? broker.name : '--'}</td>
                            </tr>)
                        })
                        }


                        </tbody>
                    </table>
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
}

export default ScheduleComponent;
