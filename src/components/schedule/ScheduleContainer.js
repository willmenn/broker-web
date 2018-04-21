import React, {Component} from 'react';
import ScheduleComponent from "./ScheduleComponent";
import ListAllStore from "../../store/ListAllStore";
import ScheduleStore from "../../store/ScheduleStore";
import ListAll from './../ListAllComponent';
import ScheduleSaveButtonComponent from "./ScheduleSaveButtonComponent";

const customizedCss = {
    margin: 'auto'
}

class ScheduleContainer extends Component {

    constructor(props) {
        super(props);
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

    getSchedule(){
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
        return sp;
    }

    render() {
        if (this.props.brokers.length !== 0
            && this.props.scheduleWrapper
            && this.state.list.shiftplaces.length > 0) {
            return (
                <div style={{width: 'inherit'}}>
                    <ListAll shiftPlaces={this.state.list.shiftplaces}/>
                    <ScheduleComponent
                        brokers={this.props.brokers}
                        scheduleWrapper={this.props.scheduleWrapper}
                        managersName={this.props.managerName}
                        shiftplaces={this.state.list.shiftplaces}
                        isSelected={this.state.isSelected}
                        schedule={this.getSchedule()}
                    />
                    <ScheduleSaveButtonComponent manager={this.props.managersName}/>
                </div>
            )
        }else {
            return (
                <div className="is-half" style={customizedCss}>
                    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span className="sr-only"></span>
                </div>
            )
        }
    }
}

export default ScheduleContainer;

