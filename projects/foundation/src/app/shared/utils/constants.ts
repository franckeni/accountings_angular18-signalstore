/**
 * The base URLS for APP.
 * @constant
 */
export const ROUTES_PATHS = {
  dashboard: 'dashboard',
  AccountsTypeCreate: 'accounts-type/create',
  AccountsTypeList: 'accounts-type/list',
  AccountsTypeEdit: 'accounts-type/edit',
  AccountsTypeDelete: 'accounts-type/delete',
};

/**
 * The list of titles present in different pages
 * @constant
 */
export const PAGES_TITLES = {
  dashboard: 'Tableau de Bord',
  dashboardButtonRedirectoList: 'Consulter la liste',
  accountsTypeCreate: 'Création de compte',
  accountsTypeList: "Liste des types d' Affectations Comptable",
  accountsTypeEdit: 'Modification du compte: ',
  accountsTypeDelete: 'Supression du compte: ',
  accountsTypeSnackbarSuccess: "L'assignation comptable à bien été modifié",
  accountsTypeSnackbarFailure: "Une erreur est survenue. Les modification n'ont pas été apportées",
};

/**
 * The list of buttons Labels in differents pages
 * @constant
 */
export const BUTTON_LABELS = {
  dialog: { add: 'Ajouter', delete: 'Supprimer', patch: 'Modifier', cancel: 'Annuler' },
};

/**
 * API call error codes.
 * @constant
 */
export const ERRORS_VARS = {
  error400: { code: 400, message: '', statutText: 'Bad Request.' },
  error403: { code: 403, message: 'You are not allowed', statutText: 'Forbidden.' },
  error404: { code: 404, message: '', statutText: 'No records found.' },
  error500: { code: 500, message: 'Please Retry later', statutText: 'Oups! something went wrong.' },
};

/**
 * @constant
 */
export enum DialogSizes {
  Big = '95%',
  Medium = '75%',
  Small = '50%',
  ExtraSmall = '30%',
}

/**
 * @constant
 */
export enum Actions {
  Create = 'create',
  Edit = 'edit',
  List = 'list',
  Delete = 'delete',
}
