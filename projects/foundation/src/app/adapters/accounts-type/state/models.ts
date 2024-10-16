import { AccountsType, AccountsTypeResponseDTO } from "../../../domain/accounts-type/models";
import { ErrorType } from "../../../shared/models/error";

export interface AccountsTypeState {
    createdOrUpdated: boolean | null;
    error?: ErrorType;
    dialog: {opened: boolean, 
            title: string, 
            action: string,
            submitButtonText?: string,
             cancelButtonText?: string};
    isLoading: boolean;
    nestedItems?: any;
    selected: AccountsTypeResponseDTO | null;
    items: any;
};

export const initialState: AccountsTypeState = {
    createdOrUpdated: null,
    error: null,
    dialog: {opened: false, title: '', action: '', submitButtonText: '', cancelButtonText: ''},
    isLoading: false,
    nestedItems: [],
    selected: null,
    items: []
};