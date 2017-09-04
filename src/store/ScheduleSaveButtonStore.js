import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

class ScheduleSaveButtonStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            isSuccess: false,
            scheduleId: "none"
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'ESCALA_SAVE' : {
                console.log(action)
                this.state.isSuccess = true;
                this.emit('change');
                break;
            }
            case 'ESCALA_DATA' :{
                console.log("ScheduleButtonAction: ")
                console.log(action)
                this.state.scheduleId=action.data.scheduleId;
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        console.log(this.state)
        return this.state;
    }

    getDefaultState(){
        return this.state = {
            isSuccess: false,
            scheduleId: "none"
        }
    }
}

const scheduleSaveButtonStore = new ScheduleSaveButtonStore;
dispatcher.register(scheduleSaveButtonStore.handleAction.bind(scheduleSaveButtonStore));

export default scheduleSaveButtonStore;