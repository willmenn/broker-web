import React, {Component} from 'react';
import ScheduleComponent from "./ScheduleComponent";
import ListAllStore from "../../store/ListAllStore";
import ScheduleStore from "../../store/ScheduleStore";
import ScheduleTabStore from '../../store/ScheduleTabStore'
import ListAll from './../ListAllComponent';
import ScheduleSaveButtonComponent from "./ScheduleSaveButtonComponent";
import ScheduleTab from "./ScheduleTab";
import {createScheduleTabAction} from "../../action/ScheduleTabAction";

const customizedCss = {
    margin: 'auto'
}

class ScheduleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: ListAllStore.getDefault(),
            tabs: ["Plantão", "Corretor"],
            activeTab: 'Plantão',
            brokers: ScheduleTabStore.getAll()
        };
    }

    componentDidMount() {
        ListAllStore.on('change', () => {
            this.setState({list: ListAllStore.getAll()});
        });
        ScheduleStore.on('change', () => {
            this.setState({isSelected: ScheduleStore.getAll()});
        });
        ScheduleTabStore.on('change', () => {
            this.setState({brokers: ScheduleTabStore.getAll()});
        })
    }

    getSchedule() {
        let sp = {};
        if (!this.state.isSelected) {
            sp = this.props.scheduleWrapper.shiftPlaceV3List[0];
        } else {
            this.props.scheduleWrapper.shiftPlaceV3List.forEach(p => {
                if (p.id === this.state.isSelected.shiftplaceSelected) {
                    sp = p;
                }
            });
        }
        return sp;
    }

    changeActiveTab(tab) {
        createScheduleTabAction(this.props.scheduleWrapper.id)
        this.setState({activeTab: tab});
    }

    changeActiveBroker(broker) {
        this.setState({activeBroker: broker});
    }

    render() {
        if (this.props.brokers.length !== 0
            && this.props.scheduleWrapper
            && this.state.list.shiftplaces.length > 0) {
            if (this.state.activeTab === 'Plantão'
                || (this.state.activeTab === 'Corretor')) {
                return (
                    <div style={{width: 'inherit'}}>
                        <ScheduleTab
                            tabs={this.state.tabs}
                            activeTab={this.state.activeTab}
                            changeActiveTab={this.changeActiveTab.bind(this)}
                        />
                        {this.state.activeTab === 'Corretor'
                            ? this.getScheduleByBroker()
                            : this.getScheduleByShiftPlace()}
                        {this.state.brokers.scheduleBroker.brokersSchedule && this.state.activeBroker !== undefined
                            || this.state.activeTab === 'Plantão'?
                        <ScheduleSaveButtonComponent manager={this.props.managersName}/> : null}
                    </div>
                )
            } else {
                return this.loading();
            }
        } else {
            return this.loading();
        }
    }

    buildMap(obj) {
        return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map());
    }

    loading() {
        return (
            <div className="is-half" style={customizedCss}>
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                <span className="sr-only"></span>
            </div>
        )
    }

    getScheduleByShiftPlace() {
        return <div style={{width: 'inherit'}}>
            <ListAll shiftPlaces={this.state.list.shiftplaces}/>
            <ScheduleComponent
                brokers={this.props.brokers}
                scheduleWrapper={this.props.scheduleWrapper}
                managersName={this.props.managerName}
                shiftplaces={this.state.list.shiftplaces}
                isSelected={this.state.isSelected}
                schedule={this.getSchedule()}
            />
        </div>;
    }

    getScheduleByBroker() {
        return <div style={{width: 'inherit'}}>
            <ListAll brokers={this.props.brokers}
                     changeActiveBroker={this.changeActiveBroker.bind(this)}
                     activeBroker={this.state.activeBroker}
                     isSchedule={true}
            />
            <ScheduleComponent
                brokers={this.props.brokers}
                scheduleWrapper={this.props.scheduleWrapper}
                managersName={this.props.managerName}
                shiftplaces={this.state.list.shiftplaces}
                isSelected={this.state.isSelected}
                schedule={this.getSchedule()}
                isBroker={true}
                brokerSchedule={this.state.activeBroker ? this.buildMap(this.props.scheduleWrapper.brokerSchedule)
                    .get(this.state.activeBroker): null}
            />
        </div>;
    }
}

export default ScheduleContainer;

