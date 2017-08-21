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
            managerName: 'MTest',
            schedulePanelVisible: false,
            scheduleData: {
                weekSchedule: {
                    dayScheduleList: [
                        {
                            brokers: []
                        }
                    ]
                }
            }
        };
    }

    handleAction(action) {
        console.log('store: ' + action.type)
        switch (action.type) {
            case 'PLANTAO_CADASTRO' : {
                this.plantaoCadastroVisible();
                break;
            }
            case 'CORRETOR_CADASTRO' : {
                this.corretorCadastroVisible();
                break;
            }
            case 'CORRETOR_CADASTRO' : {
                this.corretorCadastroVisible();
                break;
            }
            case 'ESCALA_CADASTRO' : {
                this.escalaCadastroVisible();
                break;
            }
            case 'ESCALA_DATA' : {
                this.escalaData(action.data);
                break;
            }
            case 'ESCALA_BROKERS' : {
                this.escalaBrokers(action.data);
                break;
            }
            case 'CORRETOR_DELETE' : {
                this.brokerDelete(action.data);
                break;
            }
            case 'PLANTAO_DELETE' : {
                this.shiftPlaeDelete(action.data);
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
            managerName: 'MTest',
            schedulePanelVisible: false,
            scheduleData: {
                weekSchedule: {
                    dayScheduleList: [
                        {
                            brokers: []
                        }
                    ]
                }
            }
        };
    }

    plantaoCadastroVisible() {
        this.setDefaultEventDetails();
        this.state.shiftPlacePanelVisible = true;
        this.state.isShiftPlaceFormVisible = true;
        this.state.shiftPlaceData = {
            name: "Plantão",
            address: "Endereço",
            places: "Lugares"
        };

        this.emit('change');
    }

    corretorCadastroVisible() {
        this.setDefaultEventDetails();
        this.state.isBrokerFormVisible = true;
        this.state.brokerPanelVisible = true;
        this.state.brokerData = {
            name: "Nome do Corretor"
        };
        this.emit('change');
    }

    escalaCadastroVisible() {
        this.setDefaultEventDetails();
        this.state.schedulePanelVisible = true;
        this.state.scheduleVisible = true;
        this.state.scheduleData = {"fake": "fake"};
        this.state.brokers = [];
        this.emit('change');
    }

    escalaData(data) {
        this.state.scheduleData = data;
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

    getAll() {
        return this.state;
    }
}

const panelStore = new PanelStore;
dispatcher.register(panelStore.handleAction.bind(panelStore));

export default panelStore;