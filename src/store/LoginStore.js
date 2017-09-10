import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: "",
            scheduleId: '',
            loginLoading: false
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'LOGIN_LOADING' : {
                this.state.loginLoading = true;
                this.emit('loginChange');
                break;
            }
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
        let stateDefault = PanelStore.getAll();
        stateDefault.managerName = this.state.managerName;
        stateDefault.scheduleId = this.state.scheduleId ? this.state.scheduleId : '';
        return stateDefault;
    }

    getLoginState() {
        return this.state.loginLoading;
    }

    setLoginStateToDefault() {
        this.state.loginLoading = false;
        return false;
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleAction.bind(loginStore));

export default loginStore;