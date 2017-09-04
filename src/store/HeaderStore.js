import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class HeaderStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: ""
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'HOME_ACTION' : {
                this.emit('change');
                break;
            }
        }
    }

    getAll() {
        PanelStore.setDefaultEventDetails();
        let stateDefault = PanelStore.getAll();
        stateDefault.isHomeVisible = true;
        return stateDefault;
    }
}

const headerStore = new HeaderStore;
dispatcher.register(headerStore.handleAction.bind(headerStore));

export default headerStore;