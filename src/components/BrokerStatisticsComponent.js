import React, {Component} from 'react';
import ListAllStore from '../store/ListAllStore'
import * as BrokerUtils from '../util/Broker-util'

const customizedCss = {
    margin: 'auto'
}

class BrokerStatisticsComponent extends Component {

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

    renderCard() {
        let dayWithMoreOccurency = this.getTheMostOccurencyOfTheSameDay();
        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{dayWithMoreOccurency.day}</p>
                        </div>
                    </div>
                    <div className="content">
                        É o dia com maior preferência, com
                        <a> {dayWithMoreOccurency.qty} corretores</a> escolhendo este dia.
                    </div>
                </div>
            </div>
        )
    }

    getTheMostOccurencyOfTheSameDay() {
        let brokers = this.state.list.brokers;
        let days = {"MON": 0, "TUE": 0, "WED": 0, "THU": 0, "FRI": 0, "SAT": 0, "SUN": 0}
        brokers.forEach(function (broker) {
            var count = days[broker.preference.weekDay];
            days[broker.preference.weekDay] = count + 1;
        });

        var biggest = 0;
        var biggestDay = "";
        Object.keys(days).forEach(function (day) {
            if (days[day] >= biggest) {
                biggest = days[day];
                biggestDay = day;
            }
        });

        return {day: BrokerUtils.convertEnglishDaysToPtBr(biggestDay), qty: biggest};
    }

    render() {
        return (
            <div className="column is-one-third transition5" style={{marginLeft: 0.75 + 'rem'}}>
                {this.state.list.loading ?
                    this.loadingState() :
                    this.renderCard()}
            </div>
        )
    }
}

export default BrokerStatisticsComponent;
