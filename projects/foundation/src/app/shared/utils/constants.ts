/**
 * The base URLS for APP.
 * @constant
 */
export const ROUTES_PATHS: any = {
    dashboard: 'dashboard',
    AccountsType: {
        create: 'accounts-type/create',
        list: 'accounts-type/list',
        edit: 'accounts-type/edit',
        delete: 'accounts-type/delete'
    }
}

/**
 * The list of titles present in different pages
 * @constant
 */
export const PAGES_TITLES: any = {
    dashboard: 'Tableau de Bord',
    dashboardButtonRedirectoList: 'Consulter la liste',
    AccountsType: {
        create: 'Création de compte',
        list: "Liste des types d' Affectations Comptable",
        edit: 'Modification du compte: ',
        delete: 'Supression du compte: '
    },
    accountsTypeSnackbarSuccess: "L'assignation comptable à bien été modifié",
    accountsTypeSnackbarFailure: "Une erreur est survenue. Les modification n'ont pas été apportées",
}

/**
 * The list of buttons Labels in differents pages
 * @constant
 */
export const BUTTON_LABELS: any = {
    dialog: {add: 'Ajouter', delete: 'Supprimer', patch: 'Modifier', cancel: 'Annuler'}
}

/**
 * API call error codes.
 * @constant
 */
export const ERRORS_VARS: any = {
    error400: {code:400, message:'', statutText:'Bad Request.'},
    error403: {code:403, message:'You are not allowed', statutText:'Forbidden.'},
    error404: {code:404, message:'', statutText:'No records found.'},
    error500: {code:500, message:'Please Retry later', statutText:'Oups! something went wrong.'}
}

