import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore';
import * as PanelAction from '../action/PanelAction';

class HeaderStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            managerName: "",
            listAllComponentVisible: false,
            isHomeVisible: false
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'HOME_ACTION' : {
                this.fireCountAction();
                this.state.isHomeVisible = true;
                this.state.listAllComponentVisible = false;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_BROKERS_ACTION' : {
                this.makeListAllVisible();
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES_ACTION' : {
                this.makeListAllVisible();
                break;
            }
        }
    }

    makeListAllVisible() {
        this.state.listAllComponentVisible = true;
        this.state.isHomeVisible = false;
        this.emit('change');
    }

    fireCountAction() {
        PanelAction.createPanelCountAction({type: 'PLANTAO', manager: PanelStore.getAll().managerName});
        PanelAction.createPanelCountAction({type: 'CORRETOR', manager: PanelStore.getAll().managerName});
    }

    getAll() {
        PanelStore.setDefaultEventDetails();
        let stateDefault = PanelStore.getAll();
        stateDefault.isHomeVisible = this.state.isHomeVisible;
        stateDefault.listAllComponentVisible = this.state.listAllComponentVisible;
        return stateDefault;
    }
}

const headerStore = new HeaderStore;
dispatcher.register(headerStore.handleAction.bind(headerStore));

export default headerStore;