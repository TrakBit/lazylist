//@flow
import {GET_MEMBERS, SEARCH_MEMBERS} from '../constants/member';
import type {Members} from '../types/members';
import type {Action} from '../types/Action';

export const memberReducer = (
    state: Members = [],
    action: Action
) => {
    switch (action.type) {
    case GET_MEMBERS:
        return [...state, ...action.members];
    case SEARCH_MEMBERS:
        return [...action.members];
    default:
        return state;
    }
};
