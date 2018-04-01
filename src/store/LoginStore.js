import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class LoginStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: "",
            scheduleId: '',
            loginLoading: false,
            error: false
        }
    }

    handleAction(action) {

        switch (action.type) {
            case 'LOGIN_LOADING' : {
                console.log('store: ' + action.type)
                this.state.loginLoading = true;
                this.emit('loginChange');
                break;
            }
            case 'LOGIN_MANAGER' : {
                console.log('store: ' + action.type)
                console.log(action.data)
                this.state.managerName = action.data.manager;
                this.state.scheduleId = action.data.scheduleId;
                this.emit('change');
                break;
            }
            case 'LOGIN_ERROR' : {
                console.log('store: ' + action.type)
                console.log('Login Fail.')
                this.state.error = true;
                this.emit('errorLoginChange');
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

    getErrorLoginState() {
        return this.state.error;
    }

    setLoginStateToDefault() {
        this.state.loginLoading = false;
        return false;
    }

    setErrorLoginStateToDefault() {
        this.state.error = false;
        return false;
    }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleAction.bind(loginStore));

export default loginStore;