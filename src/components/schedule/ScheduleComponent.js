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
                        <tbody>{tableBody.map(line => line)}</tbody>
                        : <tbody>
                        {this.createEmpyLineForshift("Manhã")}
                        {tableBody.morning.map(broker => broker)}
                        {this.createEmpyLineForshift("Tarde")}
                        {tableBody.afternoon.map(broker => broker)}
                        {this.createEmpyLineForshift("Noite")}
                        {tableBody.night.map(broker => broker)}
                        {!this.props.isBroker ? this.createLineForLeftPlaces() : null}
                        </tbody>}

                </table>
            )
        }
    }

    createEmpyLineForshift(shift) {
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

    createLineForLeftPlaces() {
        let obj = this.props.schedule;
        let sum = Object.keys(obj.days).map(k => obj.days[k].placeLeftCount).reduce((a, b) => a + b, 0);
        if (sum > 0) {
            return (<tr>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['SUN'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['MON'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['TUE'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['WED'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['THU'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['FRI'].placeLeftCount)}</td>
                <td className="has-text-centered">{this.showOnlyIfBiggerThan0(obj.days['SAT'].placeLeftCount)}</td>
            </tr>)
        } else {
            return null;
        }
    }

    showOnlyIfBiggerThan0(placeLeft) {
        if (placeLeft > 0) {
            return "-" + placeLeft;
        } else {
            return null;
        }
    }

    CreateTableBrokerBody() {
        var lines = new Array();
        lines.push(this.createEmpyLineForshift('Manhã'));
        lines.push(<tr>
            <td className="has-text-centered">{this.getShiftPlaceForDay('SUN', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('MON', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('TUE', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('WED', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('THU', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('FRI', 'MORNING')}</td>
            <td className="has-text-centered">{this.getShiftPlaceForDay('SAT', 'MORNING')}</td>
        </tr>);
        lines.push(
            this.createEmpyLineForshift('Tarde')
        );
        lines.push(
            <tr>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SUN', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('MON', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('TUE', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('WED', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('THU', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('FRI', 'AFTERNOON')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SAT', 'AFTERNOON')}</td>
            </tr>)
        lines.push(
            this.createEmpyLineForshift('Noite')
        );
        lines.push(
            <tr>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SUN', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('MON', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('TUE', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('WED', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('THU', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('FRI', 'NIGHT')}</td>
                <td className="has-text-centered">{this.getShiftPlaceForDay('SAT', 'NIGHT')}</td>
            </tr>)
        return lines;
    }

    getShiftPlaceForDay(day, shift) {
        if (this.props.brokerSchedule.length > 0) {
            let days = this.props.brokerSchedule
                .filter(d => d.name === day)[0];
            let sps = [];
            if (days) {
                if (shift === 'MORNING') {
                    sps = days.morning.shiftPlaceV3s;
                } else if (shift === 'AFTERNOON') {
                    sps = days.afternoon.shiftPlaceV3s;
                } else if (shift === 'NIGHT') {
                    sps = days.night.shiftPlaceV3s;
                }
            }
            if (sps.length > 0) {
                return sps[0].name;
            }
        }
        return ' ';
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
