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
            isHomeVisible: false,
            showMessages: false,
            messages: []
        }
    }

    handleAction(action) {

        switch (action.type) {
            case 'HOME_ACTION' : {
                console.log('Header Store: ' + action.type)
                this.fireCountAction();
                this.state.isHomeVisible = true;
                this.state.listAllComponentVisible = false;
                this.state.listScheduleVisible = false;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_BROKERS_ACTION' : {
                console.log('Header Store: ' + action.type)
                this.makeListAllVisible();
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES_ACTION' : {
                console.log('Header Store: ' + action.type)
                this.makeListAllVisible();
                break;
            }
            case 'SHOW_LIST_SCHEDULE_ACTION' : {
                console.log('Header Store: ' + action.type)
                this.makeScheduleListVisible();
                break;
            }
            case 'MESSAGE_DATA' : {
                console.log('Header Store: ' + action.type)
                this.makeMessagesVisible(action.data);
                break;
            }
        }
    }

    makeMessagesVisible(data) {
        this.state.listAllComponentVisible = false;
        this.state.listScheduleVisible = false;
        this.state.isHomeVisible = false;
        this.state.showMessages = true;
        this.state.messages = data;
        this.emit('change');
    }

    makeListAllVisible() {
        this.state.listAllComponentVisible = true;
        this.state.listScheduleVisible = false;
        this.state.isHomeVisible = false;
        this.state.showMessages = false;
        this.emit('change');
    }

    makeScheduleListVisible() {
        this.state.listAllComponentVisible = false;
        this.state.listScheduleVisible = true;
        this.state.isHomeVisible = false;
        this.state.showMessages = false;
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
        stateDefault.listScheduleVisible = this.state.listScheduleVisible;
        stateDefault.showMessages = this.state.showMessages;
        stateDefault.messages = this.state.messages;
        return stateDefault;
    }
}

const headerStore = new HeaderStore;
dispatcher.register(headerStore.handleAction.bind(headerStore));

export default headerStore;