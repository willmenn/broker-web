import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore';
import * as PanelAction from '../action/PanelAction';

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
                this.fireCountAction();
                this.emit('change');
                break;
            }
        }
    }

    fireCountAction() {
        PanelAction.createPanelCountAction({type: 'PLANTAO', manager: PanelStore.getAll().managerName});
        PanelAction.createPanelCountAction({type: 'CORRETOR', manager: PanelStore.getAll().managerName});
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