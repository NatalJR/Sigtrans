/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

// import update from 'immutability-helper';

export function events(state = new List(), action) {

    if (action.type === 'LISTOPENEVENTS') {
        const events = action.events;
        const loading = !action.loading;
        return Object.assign({}, state, {events, loading});
    }

    if (action.type === 'LISTASYNC') {
        const options = action.options;
        const listType = action.listType;
        return Object.assign({}, state, {[listType]:options});
    }

    if (action.type === 'LISTDEPENDENTOPTION') {
        const listType = action.listType;
        const option = action.options;
        const options = Object.assign({}, state.options, {[listType]:option});

        return Object.assign({}, state, { options });
    }

    if (action.type === 'LISTEVENTSOPTIONS') {
        const options = action.options;
        return Object.assign({}, state, {options});
    }

    if (action.type === 'SELECTOPENEVENT') {
        const selectedEvent = state.events.find(item =>{
            return item.id===action.id;
        });
        const selectedEventID = selectedEvent.id;
        return Object.assign({}, state, {selectedEvent, selectedEventID});
    }

    if (action.type === 'TOGGLEEVENTSMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'ONCHANGE') {
        if(action.subMenu) {
            const selectedEvent = state.selectedEvent;
            selectedEvent[action.subMenu][action.operator] = action.newValue;
            return Object.assign({}, state, {selectedEvent});
        }
        return Object.assign({}, state, {[action.operator]:action.newValue});
    }

    if (action.type === 'ONCHANGEDROPDOWN') {
        const selectedEvent = state.selectedEvent;
        if(!selectedEvent[action.subMenu][action.operator])
            selectedEvent[action.subMenu][action.operator]={};
        selectedEvent[action.subMenu][action.operator].id=action.newValue;
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'NESTEDINPUTCHANGE') {
        let selectedEvent = state.selectedEvent;
        let item;
        //é possivel melhorar essa joça
        if(action.operator){
            item = selectedEvent[action.subMenu][action.operator].find(item => {
                return item === action.id;
            });
            if(!action.dropdown)
                item[action.input]=action.value;
            else{
                if(!item[action.input])
                    item[action.input]={};
                item[action.input][action.dropdown]=action.value;
            }
            selectedEvent[action.subMenu][action.operator][item]=item;
        }
        else {
            item = selectedEvent[action.subMenu].find(item => {
                return item === action.id;
            });
            if(!action.dropdown)
                item[action.input]=action.value;
            else {
                if(action.dropdown!=='condutor') {
                    if (!item[action.input])
                        item[action.input] = {};
                    item[action.input][action.dropdown] = action.value;
                }
                else {
                    if(!item[action.dropdown])
                        item[action.dropdown]={};
                    item[action.dropdown][action.input] = action.value;
                }
            }
            selectedEvent[action.subMenu][item]=item;
        }
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'ADDINVOLVED') {
        let selectedEvent = state.selectedEvent;
        selectedEvent.envolvidos.push({});
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'REMOVEINVOLVED') {
        let selectedEvent = state.selectedEvent;
        const id = state.selectedEvent.envolvidos.indexOf(action.involved);
        selectedEvent.envolvidos.splice(id, 1);
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'ADDVEHICLE') {
        let selectedEvent = state.selectedEvent;
        selectedEvent.veiculos.push({});
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'REMOVEVEHICLE') {
        let selectedEvent = state.selectedEvent;
        const id = selectedEvent.veiculos.indexOf(action.vehicle);
        selectedEvent.veiculos.splice(id, 1);
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'ADDVIA') {
        let selectedEvent = state.selectedEvent;
        if(!selectedEvent.dadosEstatisticos.vias)
            selectedEvent.dadosEstatisticos.vias=[];
        selectedEvent.dadosEstatisticos.vias.push({});
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'REMOVEVIA') {
        let selectedEvent = state.selectedEvent;
        const id = selectedEvent.dadosEstatisticos.vias.indexOf(action.via);
        selectedEvent.dadosEstatisticos.vias.splice(id, 1);
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'INITIALIZEEVENT'){
        let selectedEvent = {
            dadosGerais:{},
            dadosEstatisticos:{},
            veiculos:[],
            envolvidos:[]
        };
        return Object.assign({}, state, {selectedEvent});
    }

    return state;

}
