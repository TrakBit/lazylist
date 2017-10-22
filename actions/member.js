import {getMembersDataAll, getMembersDataSome} from '../api/member';
import {GET_MEMBERS} from '../constants/member';

export const getMembersSome = () => (
    async (dispatch) => {
        const data = await getMembersDataSome();
        const members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);

export const getMembersAll = () => (
    async (dispatch) => {
        const data = await getMembersDataAll();
        const members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);
