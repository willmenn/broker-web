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
            loading: false,
            loadingSchedule: false,
            schedules: []
        }
    }

    handleAction(action) {

        switch (action.type) {
            case 'SHOW_ALL_BROKERS' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.brokers = action.data;
                this.state.loading = false;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_BROKERS_LOADING' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.loading = true;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES_LOADING' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.loading = true;
                this.emit('change');
                break;
            }
            case 'SHOW_ALL_SHIFT_PLACES' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.shiftplaces = action.data;
                this.state.loading = false;
                this.emit('change');
                break;
            }
            case 'SHOW_LIST_SCHEDULE' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.schedules = action.data;
                this.state.loadingSchedule = false;
                this.emit('change');
                break;
            }
            case 'SHOW_LIST_SCHEDULE_LOADING' : {
                console.log('ListAll s=Store: ' + action.type)
                this.getDefault();
                this.state.loadingSchedule = true;
                this.emit('change');
                break;
            }
        }
    }

    getDefault() {
        let defaultState = {
            brokers: [],
            shiftplaces: [],
            loading: false,
            loadingSchedule: true,
            schedules: []
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