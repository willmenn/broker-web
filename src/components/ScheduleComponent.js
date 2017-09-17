import React, {Component} from 'react';
import ScheduleSaveButtonComponent from '../components/ScheduleSaveButtonComponent';

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


    render() {
        if (this.props.brokers.length !== 0 && this.props.scheduleWrapper) {
            return (
                <div>
                    <table className="table is-striped is-narrow-desktop">
                        <thead>
                        <tr>
                            <th title="Corretor">Corretor</th>
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
                        {this.props.brokers.map((broker) => {
                            const map = new Map();
                            let obj = this.props.scheduleWrapper;
                            Object.keys(obj).forEach(key => {
                                map.set(key, obj[key]);
                            });
                            let days = map.get(broker.name);
                            if( days && days.length > 0) {
                                return (<tr>
                                    <td className="has-text-centered"><a title={broker.name}>{broker.name}</a></td>
                                    <td className="has-text-centered">{this.containsDay('SUN', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('MON', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('TUE', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('WED', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('THU', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('FRI', days) ? 'Escalado' : '--'}</td>
                                    <td className="has-text-centered">{this.containsDay('SAT', days) ? 'Escalado' : '--'}</td>
                                </tr>)
                            }else{
                                return null;
                            }
                        })
                        }
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
}

export default ScheduleComponent;
