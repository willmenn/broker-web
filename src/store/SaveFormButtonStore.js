import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

class SaveButtonStore extends EventEmitter {

    constructor() {
        super();
        this.state = {
            broker: {
                isSuccess: false,
                isEdited: false
            },
            shiftplace: {
                isSuccess: false,
                isEdited: false
            }
        }
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'BROKER_BUTTON_SAVE' : {
                this.state.broker.isSuccess = true;
                this.emit('change');
                break;
            }
            case 'BROKER_BUTTON_EDIT' : {
                this.state.broker.isEdited = true;
                this.emit('change');
                break;
            }
            case 'BROKER_BUTTON_RESET' : {
                this.setDefaultState();
                this.emit('change');
                break;
            }
            case 'SHIFTPLACE_BUTTON_SAVE' : {
                this.state.shiftplace.isSuccess = true;
                this.emit('change');
                break;
            }
            case 'SHIFTPLACE_BUTTON_EDIT' : {
                this.state.shiftplace.isEdited = true;
                this.emit('change');
                break;
            }
        }
    }

    getBrokerAll() {
        console.log('saveButton getBrokerAll:')
        console.log(this.state)
        return {
            isSuccess: this.state.broker.isSuccess,
            isEdited: this.state.broker.isEdited
        };
    }

    getShiftPlaceAll() {
        console.log('saveButton getShiftPlaceAll:')
        console.log(this.state)
        return {
            isSuccess: this.state.shiftplace.isSuccess,
            isEdited: this.state.shiftplace.isEdited
        };
    }

    setDefaultState() {
        this.state = {
            broker: {
                isSuccess: false,
                isEdited: false
            },
            shiftplace: {
                isSuccess: false,
                isEdited: false
            }
        }
        return {
            isSuccess: false,
            isEdited: false
        };
    }
}

const saveButtonStore = new SaveButtonStore;
dispatcher.register(saveButtonStore.handleAction.bind(saveButtonStore));

export default saveButtonStore;