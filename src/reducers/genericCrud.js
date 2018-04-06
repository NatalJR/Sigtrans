import {List} from 'immutable';

export function genericCrud(state = new List(), action) {

    if (action.type === 'ONCHANGECRUDINPUT') {
        if (action.value === undefined) {
            const newState = delete(state[action.input]);
            return Object.assign({}, newState);
        }
        const value = action.value;
        return Object.assign({}, state, {[action.input]: value});
    }

    if (action.type === 'ONCHANGECRUDFORMINPUT') {
        const value = action.value;
        let form = Object.assign({}, state.form);
        if(!value){
            delete(form[action.input]);
            return Object.assign({}, state, form);
        }
        if(action.input.toString()!=="nome"){
            if(!form[action.input])
                form[action.input]={};
            form[action.input].nome = value;
            return Object.assign({}, state, {form});
        } else {
            form[action.input] = value;
            return Object.assign({}, state, {form});
        }
    }

    if (action.type === 'TOGGLEATMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'LISTACCIDENTTYPES') {
        const input = '';
        const pages = Math.ceil(action.data.count / action.data.pageSize);
        return Object.assign({}, state, {
            [action.selectedType]: action.data.values,
            input,
            pages
        });
    }

    if (action.type === 'SELECTACCIDENTTYPE') {
        const selectedType = state.accidentTypes.find(item => {
            return item._id === action.id;
        });
        return Object.assign({}, state, {selectedType});
    }
    return state;
}
