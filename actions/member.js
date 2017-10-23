import {getMembersDataPage1, getMembersDataPage2, getMembersDataSearch} from '../api/member';
import {GET_MEMBERS} from '../constants/member';

export const getMembersPage1 = () => (
    async (dispatch) => {
        const data = await getMembersDataPage1();
        const members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);

export const getMembersPage2 = () => (
    async (dispatch) => {
        const data = await getMembersDataPage2();
        const members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);

export const getMembersSearch = (search, searchType) => (
    async (dispatch) => {
        const data = await getMembersDataSearch(search, searchType);
        const members = data.data;
        dispatch({type: 'SEARCH_MEMBERS', members});
    }
);
