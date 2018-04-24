import dispatcher from "../Dispatcher";
import {EventEmitter} from 'events';

class ScheduleTabStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            scheduleBroker: {}
        }
    }

    handleAction(action) {
        switch (action.type) {
            case 'ESCALA_CORRETOR' : {
                this.state.scheduleBroker = action.data;
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        return this.state;
    }

    getDefault(){
        return {scheduleBroker: null}
    }
}
const scheduleTabStore = new ScheduleTabStore;
dispatcher.register(scheduleTabStore.handleAction.bind(scheduleTabStore));


export default scheduleTabStore;