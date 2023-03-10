// ---- React-Select Import ----
import { MultiValue } from 'react-select';

// ---- TypeScript Import ----
import { Adverts } from '../components/Cards/AdvertsCards';
import { Skills } from '../components/SkillsSelect';

/*=====================================
============ACTIONS TYPES==============
=======================================*/

export const FETCH_ADVERTISEMENTS_SKILLS_AND_USERS =
  'FETCH_ADVERTISEMENTS_SKILLS_AND_USERS';
export const ADD_ADVERTS_IN_STATE = 'ADD_ADVERTS_IN_STATE';
export const ADD_SKILLS_IN_STATE = 'ADD_SKILLS_IN_STATE';
export const CHANGE_INPUT_VALUE_NEW_ADVERT = 'CHANGE_INPUT_VALUE_NEW_ADVERT';
export const ADD_SKILLS_NEW_ADVERT = 'ADD_SKILLS_NEW_ADVERT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SUBMIT_NEW_ADVERT = 'SUBMIT_NEW_ADVERT';
export const SUBMIT_NEW_ADVERT_ERROR = 'SUBMIT_NEW_ADVERT_ERROR';
export const TOGGLE_SUBMIT_SUCCESS = 'TOGGLE_SUBMIT_SUCCESS';
export const FETCH_ADVERT_FOR_MODIFICATION = 'FETCH_ADVERT_FOR_MODIFICATION';
export const SET_INFO_ADVERT_IN_INPUTS_STATE =
  'SET_INFO_ADVERT_IN_INPUTS_STATE';
export const EDIT_IN_DB_THIS_ADVERT = 'EDIT_IN_DB_THIS_ADVERT';
export const DELETE_ADVERT = 'DELETE_ADVERT';

/*=====================================
===========ACTIONS CREATORS============
=======================================*/
/**
 * Fetch in DB a list of advertisements
 * @returns Object of action
 */
export function actionFetchAdvertsementsSkillsAndUsers() {
  return {
    type: FETCH_ADVERTISEMENTS_SKILLS_AND_USERS,
  };
}

/**
 * Save in state an array of adverts from the API
 * @param adverts list of all of adverts from API
 * @returns Object of action
 */
export function actionAddAdvertsInState(adverts: []) {
  return {
    type: ADD_ADVERTS_IN_STATE,
    payload: adverts,
  };
}

/**
 * Save in state an array of skilss from the API
 * @param {Array} skills list of skills from DB
 * @returns Object of action
 */
export function actionAddSkillsInState(skills: []) {
  return {
    type: ADD_SKILLS_IN_STATE,
    payload: skills,
  };
}

/**
 * Change the value's inputs of advertisements state for new advert
 * @param newValue  value input
 * @param nameInput name of input in advertisements state
 * @returns Object Action
 */
export function actionChangeInputValueNewAdvert(
  newValue: string | File,
  nameInput: string
) {
  return {
    type: CHANGE_INPUT_VALUE_NEW_ADVERT,
    payload: {
      nameInput: nameInput,
      newValue: newValue,
    },
  };
}

/**
 * Set an array of skills in state for new advert
 * @param skills of new advert
 * @returns Object Action
 */
export function actionAddSkillsNewAdvert(skills: MultiValue<Skills>) {
  return {
    type: ADD_SKILLS_NEW_ADVERT,
    payload: skills,
  };
}

/**
 * Set a message in state advertisemnt for newadvert
 * @param message to return
 * @returns Object Action
 */
export function actionAddMessage(message: string) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

/**
 * Fetch POST to API the new Advert form
 * @returns Object Action
 */
export function actionSubmitNewAdvert() {
  return {
    type: SUBMIT_NEW_ADVERT,
  };
}

/**
 * Erreur from API when a user add an advert
 * @returns Object Action
 */
export function actionSubmitNewAdvertError() {
  return {
    type: SUBMIT_NEW_ADVERT_ERROR,
  };
}

/**
 * Advert submit success can navigate from home
 * @param trueOrFalse true for redirect, false after
 * @param message Success message
 * @returns Object action
 */
export function actionToggleSubmitSuccess(trueOrFalse: boolean, message = '') {
  return {
    type: TOGGLE_SUBMIT_SUCCESS,
    payload: {
      trueOrFalse: trueOrFalse,
      message: message,
    },
  };
}

/**
 * Search advert info in DB with this id for set input informations
 * @param advertId advert id to searched
 * @returns Object Action
 */
export function actionFetchAdvertForModification(advertId: number) {
  return {
    type: FETCH_ADVERT_FOR_MODIFICATION,
    payload: advertId,
  };
}

/**
 * Save in inputs advertisements state the advert info, ready for modification
 * @param advert info of advert
 * @returns Object Action
 */
export function actionSetInfoAdvertInInputsState(advert: Adverts) {
  return {
    type: SET_INFO_ADVERT_IN_INPUTS_STATE,
    payload: advert,
  };
}

/**
 * Edit in DB this advert
 * @param idAdvert id advert to modify
 * @returns Object Action
 */
export function actionEditInDbThisAdvert(idAdvert: number) {
  return {
    type: EDIT_IN_DB_THIS_ADVERT,
    payload: idAdvert,
  };
}

/**
 * Delete advert user in DB
 * @param idAdvertToDelete Advert ID to hidden
 * @returns Object Action
 */
export function actionDeleteAdvert(idAdvertToDelete: number) {
  return {
    type: DELETE_ADVERT,
    payload: idAdvertToDelete,
  };
}
