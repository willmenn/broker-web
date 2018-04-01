import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';
import PanelStore from './PanelStore'

class ListStore extends EventEmitter {

    constructor() {
        super()
        this.state = {
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            isBrokerFormVisible: false,
            brokerData: {
                name: "Nome do Corretor"
            },
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            }
        }
    }

    handleAction(action) {

        switch (action.type) {
            case 'PLANTAO_EDIT_LIST' : {
                console.log('List Store: ' + action.type)
                this.plantaoEditVisible(action.data);
                break;
            }
            case 'CORRETOR_EDIT_LIST' : {
                console.log('List Store: ' + action.type)
                this.corretorEditVisible(action.data);
                break;
            }
        }
    }

    setDefaultEventDetails(){
        this.state = {
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            isBrokerFormVisible: false,
            brokerData: {
                name: "Nome do Corretor"
            },
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            },
        }
    }
    plantaoEditVisible(data) {
        this.setDefaultEventDetails();
        this.state.isShiftPlaceFormVisible= true;
        this.state.shiftPlaceData=data;
        this.state.edit= true;
        this.emit('change');
    }

    corretorEditVisible(data) {
        this.setDefaultEventDetails();
        this.state.brokerData=data;
        this.state.isBrokerFormVisible= true;
        this.emit('change');
    }

    getAll(){
        let stateDefault =PanelStore.getAll();
        stateDefault.isShiftPlaceFormVisible=this.state.isShiftPlaceFormVisible;
        stateDefault.isListComponentVisible=this.state.isListComponentVisible;
        stateDefault.isBrokerFormVisible=this.state.isBrokerFormVisible;
        stateDefault.brokerData=this.state.brokerData;
        stateDefault.shiftPlaceData=this.state.shiftPlaceData;
        return stateDefault;
    }
}


const listStore = new ListStore;
dispatcher.register(listStore.handleAction.bind(listStore));

export default listStore;