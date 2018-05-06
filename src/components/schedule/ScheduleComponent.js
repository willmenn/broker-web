import React, {Component} from 'react';

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
        if (this.props.brokerSchedule === null) {
            return (
                <div className="content" style={{textAlign: 'center'}}><h3>Por favor escolha um corretor para visualizar
                    a escala.</h3></div>)
        } else {
            var tableBody = this.props.isBroker ? this.CreateTableBrokerBody() : this.CreateTableBody();
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
                    {this.props.isBroker ?
                        <tbody> tableBody</tbody>
                        : <tbody>
                        {this.createEmpyLineForshift("Manhã")}
                        {tableBody.morning.map(broker => broker)}
                        {this.createEmpyLineForshift("Tarde")}
                        {tableBody.afternoon.map(broker => broker)}
                        {this.createEmpyLineForshift("Noite")}
                        {tableBody.night.map(broker => broker)}
                        </tbody>}

                </table>
            )
        }
    }

    createEmpyLineForshift(shift){
        return (<tr className="is-selected">
            <td className="has-text-centered">{shift}</td>
            <td className="has-text-centered">{" "}</td>
            <td className="has-text-centered">{" "}</td>
            <td className="has-text-centered">{" "}</td>
            <td className="has-text-centered">{" "}</td>
            <td className="has-text-centered">{" "}</td>
            <td className="has-text-centered">{" "}</td>
        </tr>)
    }
    CreateTableBrokerBody() {
        return (
            <tr>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SUN')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('MON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('TUE')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('WED')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('THU')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('FRI')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SAT')}</td>
            </tr>)

    }

    getShiftPlaceForDay(day) {
        let sp = '';
        this.props.brokerSchedule.forEach(s => {
            if (s.day === day) {
                sp = s.plantaoName;
            }
        });
        return sp;
    }

    CreateTableBody() {
        let obj = this.props.schedule;
        var biggest = this.getBiggestObjectWithLength(obj);

        var tableLinesMorning = new Array();
        var tableLinesAfternoon = new Array();
        var tableLinesNight = new Array();
        for (let i = 0; i < biggest.biggestMorning; i++) {
            tableLinesMorning.push(<tr>
                <td className="has-text-centered">{this.validateDay(obj.days['SUN'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['MON'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['TUE'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['WED'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['THU'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['FRI'].morning, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['SAT'].morning, i)}</td>
            </tr>);
        }
        for (let i = 0; i < biggest.biggestAfternoon; i++) {
            tableLinesAfternoon.push(<tr>
                <td className="has-text-centered">{this.validateDay(obj.days['SUN'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['MON'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['TUE'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['WED'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['THU'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['FRI'].afternoon, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['SAT'].afternoon, i)}</td>
            </tr>);
        }
        for (let i = 0; i < biggest.biggestNight; i++) {
            tableLinesNight.push(<tr>
                <td className="has-text-centered">{this.validateDay(obj.days['SUN'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['MON'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['TUE'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['WED'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['THU'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['FRI'].night, i)}</td>
                <td className="has-text-centered">{this.validateDay(obj.days['SAT'].night, i)}</td>
            </tr>);
        }
        return {morning: tableLinesMorning, afternoon: tableLinesAfternoon, night: tableLinesNight};
    }

    getBiggestObjectWithLength(obj) {
        var biggestMorning = 0;
        var biggestAfternoon = 0;
        var biggestNight = 0;
        Object.keys(obj.days).forEach(key => {
            if (biggestMorning < obj.days[key].morning.brokerV3List.length) {
                biggestMorning = obj.days[key].morning.brokerV3List.length;
            }
            if (biggestAfternoon < obj.days[key].afternoon.brokerV3List.length) {
                biggestAfternoon = obj.days[key].afternoon.brokerV3List.length;
            }
            if (biggestNight < obj.days[key].night.brokerV3List.length) {
                biggestNight = obj.days[key].night.brokerV3List.length;
            }
        });

        return {
            biggestMorning: biggestMorning,
            biggestAfternoon: biggestAfternoon,
            biggestNight: biggestNight
        };
    }

    validateDay(obj, i) {
        if (obj.brokerV3List.length > 0 && typeof obj.brokerV3List[i] !== 'undefined') {
            return obj.brokerV3List[i]['name'];
        } else {
            return '';
        }
    }
}

export default ScheduleComponent;
