import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: "",
            scheduleId: ''
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'LOGIN_MANAGER' : {
                console.log(action.data)
                this.state.managerName = action.data.manager;
                this.state.scheduleId = action.data.scheduleId;
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        let stateDefault =PanelStore.getAll();
        stateDefault.managerName = this.state.managerName;
        stateDefault.scheduleId= this.state.scheduleId ? this.state.scheduleId : '';
        return stateDefault;
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleAction.bind(loginStore));

export default loginStore;