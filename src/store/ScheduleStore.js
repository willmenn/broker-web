import dispatcher from "../Dispatcher";
import {EventEmitter} from 'events';

class ScheduleStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            shiftplaceSelected: ''
        }
    }

    handleAction(action) {
        switch (action.type) {
            case 'CHANGE_SCHEDULE_SHIFTPLACE' : {
                this.state.shiftplaceSelected = action.data;
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        return this.state;
    }
}
const scheduleStore = new ScheduleStore;
dispatcher.register(scheduleStore.handleAction.bind(scheduleStore));


export default scheduleStore;