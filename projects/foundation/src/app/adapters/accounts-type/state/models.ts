import { AccountsTypeListResponseDTO, AccountsTypeResponseDTO } from "../../../domain/accounts-type/models";
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
    nestedItems?: AccountsTypeListResponseDTO;
    selected: AccountsTypeResponseDTO | null;
    items: AccountsTypeListResponseDTO;
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