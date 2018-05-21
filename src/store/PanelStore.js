import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

class PanelStore extends EventEmitter {

    constructor() {
        super()
        this.state = {
            isHomeVisible: true,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: false,
            brokerPanelVisible: false,
            scheduleVisible: false,
            shiftPlaceCount: 0,
            brokerCount: 0,
            managerName: '',
            listData: [],
            schedulePanelVisible: false,
            listAllComponentVisible: false,
            listScheduleVisible: false,
            shiftPlaceList: [],
            showMessages: false,
            messages: []
        };
    }

    handleAction(action) {
        switch (action.type) {
            case 'PLANTAO_CADASTRO' : {
                console.log('store: ' + action.type)
                this.plantaoCadastroVisible();
                break;
            }
            case 'CORRETOR_CADASTRO' : {
                console.log('store: ' + action.type)
                this.corretorCadastroVisible(action.data);
                break;
            }
            case 'ESCALA_CADASTRO' : {
                console.log('store: ' + action.type)
                this.escalaCadastroVisible();
                break;
            }
            case 'ESCALA_DATA' : {
                console.log('store: ' + action.type)
                this.escalaData(action.data);
                break;
            }
            case 'ESCALA_BROKERS' : {
                console.log('store: ' + action.type)
                this.escalaBrokers(action.data);
                break;
            }
            case 'CORRETOR_DELETE' : {
                console.log('store: ' + action.type)
                this.brokerDelete(action.data);
                break;
            }
            case 'PLANTAO_DELETE' : {
                console.log('store: ' + action.type)
                this.shiftPlaeDelete(action.data);
                break;
            }
            case 'CORRETOR_EDIT' : {
                console.log('store: ' + action.type)
                this.brokerEdit(action.data);
                break;
            }
            case 'PLANTAO_EDIT' : {
                console.log('store: ' + action.type)
                this.shiftPlaceEdit(action.data);
                break;
            }
            case 'CORRETOR_COUNT' : {
                console.log('store: ' + action.type)
                this.brokerCount(action.data);
                break;
            }
            case 'PLANTAO_COUNT' : {
                console.log('store: ' + action.type)
                this.shiftPlaceCount(action.data);
                break;
            }
            case 'ESCALA_SAVE' : {
                console.log('store: ' + action.type)
                this.state.scheduleId = action.scheduleId;
                this.emit('change');
                break;
            }
        }
    }

    setDefaultEventDetails() {
        this.state = {
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: false,
            brokerPanelVisible: false,
            scheduleVisible: false,
            shiftPlaceCount: this.state.shiftPlaceCount,
            brokerCount: this.state.brokerCount,
            managerName: this.state.managerName ? this.state.managerName : '',
            scheduleId: this.state.scheduleId ? this.state.scheduleId : '',
            schedulePanelVisible: false,
            listAllComponentVisible: false,
            listScheduleVisible: false,
            shiftPlaceList: [],
            showMessages: false,
            messages: []
        };
    }

    plantaoCadastroVisible() {
        this.setDefaultEventDetails();
        this.state.shiftPlacePanelVisible = true;
        this.state.isShiftPlaceFormVisible = true;
        this.state.shiftPlaceData = {
            name: "Plantão",
            address: "Endereço",
            places: "Lugares",
            SUN:{value: 0},
            MON:{value: 0},
            TUE:{value: 0},
            WED:{value: 0},
            THU:{value: 0},
            FRI:{value: 0},
            SAT:{value: 0}
        };

        this.emit('change');
    }

    corretorCadastroVisible(shiftPlaceList) {
        this.setDefaultEventDetails();
        this.state.isBrokerFormVisible = true;
        this.state.brokerPanelVisible = true;
        this.state.shiftPlaceList = shiftPlaceList;
        this.state.brokerData = {
            name: "Nome do Corretor"
        };
        this.emit('change');
    }

    escalaCadastroVisible() {
        this.setDefaultEventDetails();
        this.state.schedulePanelVisible = false;
        this.state.scheduleVisible = true;
        this.state.brokers = [];
        this.emit('change');
    }

    escalaData(data) {
        this.state.scheduleData = data;
        this.state.scheduleId = data.id;
        this.emit('change');
    }

    escalaBrokers(data) {
        this.state.brokers = data;
        this.emit('change');
    }

    brokerDelete(data) {
        this.setDefaultEventDetails();
        this.state.isListComponentVisible = true;
        this.state.listOptions = {title: 'Corretores', action: 'Delete', entity: 'broker'};
        this.state.listData = data;
        this.state.brokerPanelVisible = true;
        this.emit('change');
    }

    shiftPlaeDelete(data) {
        this.setDefaultEventDetails();
        this.state.isListComponentVisible = true;
        this.state.shiftPlacePanelVisible = true;
        this.state.listOptions = {title: 'Plantões', action: 'Delete'};
        this.state.listData = data;
        this.emit('change');
    }

    brokerEdit(data) {
        this.setDefaultEventDetails();
        this.state.isListComponentVisible = true;
        this.state.listOptions = {title: 'Corretores', action: 'Edit', entity: 'CORRETOR_EDIT'};
        this.state.listData = data;
        this.state.brokerPanelVisible = true;
        this.state.edit = true;
        this.emit('change');
    }

    shiftPlaceEdit(data) {
        this.setDefaultEventDetails();
        this.state.isListComponentVisible = true;
        this.state.shiftPlacePanelVisible = true;
        this.state.listOptions = {title: 'Plantões', action: 'Edit', entity: 'PLANTAO_EDIT'};
        this.state.listData = data;
        this.state.edit = true;
        this.emit('change');
    }

    shiftPlaceCount(data) {
        this.state.shiftPlaceCount = data;
        this.emit('componentChange');
    }

    brokerCount(data) {
        this.state.brokerCount = data;
        this.emit('componentChange');
    }

    getPanelData() {
        return {
            shiftPlaceCount: this.state.shiftPlaceCount,
            brokerCount: this.state.brokerCount,
            scheduleId: this.state.scheduleId
        }
    }

    getAll() {
        return this.state;
    }
}

const panelStore = new PanelStore;
dispatcher.register(panelStore.handleAction.bind(panelStore));

export default panelStore;