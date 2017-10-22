import {getMembersData} from '../api/member';
import {GET_MEMBERS} from '../constants/member';

export const getMembers = () => (
    async (dispatch) => {
        const data = await getMembersData();
        const members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);
