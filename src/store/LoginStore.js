import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: ""
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'LOGIN_MANAGER' : {
                console.log(action.data)
                this.state.managerName = action.data.manager;
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        let stateDefault =PanelStore.getAll();
        stateDefault.managerName = this.state.managerName;
        return stateDefault;
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleAction.bind(loginStore));

export default loginStore;