import {GET_MEMBERS} from '../constants/member';

export const memberReducer = (
    state = [],
    action
) => {
    switch (action.type) {
    case GET_MEMBERS:
        return action.members;
    default:
        return state;
    }
};
