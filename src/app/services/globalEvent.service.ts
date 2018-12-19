import { EventEmitter } from '@angular/core';

export const GlobalEventName = {
    RECORD_SELECTED: 'recordSelectedEvent',
    FIELD_TYPE_SELECTED: 'fieldTypeSelectedEvent',
    MAPPING_TYPE_SELECTED: 'mappingSelectedEvent',
    RECORD_ADD: 'recordAdd',
    VARIABLE_SAVE: 'variableSave',
    OPERATION_SAVE: 'operationbleSave',
    ON_LOGOUT: 'logout',
    RECORD_RESET_SELECTED_ELEMENT: 'recordResetSelectedElement',
    RECORD_REMOVE: 'recordRemove',
    FORMULA_SAVE: 'formulaSave',
};

export class GlobalEventService {

    private static emitters: {
        [event: string]: EventEmitter<any>
    } = {};

    static get(event:string): EventEmitter<any> {

        if (!this.emitters[event]) {
            this.emitters[event] = new EventEmitter<any>();
        }

        return this.emitters[event];
    }

    static emit(event:string, data: any) {

        return this.get(event).emit(data);

    }

    static subscribe(event:string, callback) {

        return this.get(event).subscribe(callback);

    }

}
