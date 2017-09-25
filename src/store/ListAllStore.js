import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore';
import * as PanelAction from '../action/PanelAction';

class ListAllStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            brokers: [],
            shiftplaces: [],
            loading: false
        }
    }

    handleAction(action) {
        console.log('ListAll s=Store: ' + action.type)
        switch (action.type) {
            case 'SHOW_ALL_BROKERS' : {
                this.getDefault();
                this.state.brokers = action.data;
                this.state.loading = false;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_BROKERS_LOADING' : {
                this.getDefault();
                this.state.loading = true;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES_LOADING' : {
                this.getDefault();
                this.state.loading = true;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES' : {
                this.getDefault();
                this.state.shiftplaces = action.data;
                this.state.loading = false;
                this.emit('change');
                break;
            }
        }
    }

    getDefault() {
        let defaultState = {
            brokers: [],
            shiftplaces: [],
            loading: false
        };

        this.state = defaultState;
        return defaultState;
    }

    getAll() {
        return this.state;
    }
}

const listAllStore = new ListAllStore;
dispatcher.register(listAllStore.handleAction.bind(listAllStore));

export default listAllStore;