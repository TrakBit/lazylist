//@flow
import {getMembersDataPage, getMembersDataMore, getMembersDataSearch} from '../api/member';
import {GET_MEMBERS, SEARCH_MEMBERS} from '../constants/member';
import type {Dispatch} from 'redux';
import type {
    GET_MEMBERS_ACTION,
    SEARCH_MEMBERS_ACTION
} from '../types/Action';
import type {Members} from '../types/members';

type Data = {
  data: Members
}

export const getMembersPage = () => (
    async (dispatch: Dispatch<GET_MEMBERS_ACTION>) => {
        //$FlowFixMe
        const data: Data = await getMembersDataPage();
        const members: Members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);

export const getMembersMore = (page: number) => (
    async (dispatch: Dispatch<GET_MEMBERS_ACTION>) => {
        //$FlowFixMe
        const data: Data = await getMembersDataMore(page);
        const members: Members = data.data;
        dispatch({type: GET_MEMBERS, members});
    }
);

export const getMembersSearch = (search: string, searchType: number) => (
    async (dispatch: Dispatch<SEARCH_MEMBERS_ACTION>) => {
        //$FlowFixMe
        const data: Data = await getMembersDataSearch(search, searchType);
        const members: Members = data.data;
        dispatch({type: SEARCH_MEMBERS, members});
    }
);
