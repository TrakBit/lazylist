//@flow
import type {Members} from '../types/members';

export type GET_MEMBERS_ACTION = {|
    type: 'GET_MEMBERS',
    members: Members
|}

export type SEARCH_MEMBERS_ACTION = {|
    type: 'SEARCH_MEMBERS',
    members: Members
|}

export type Action =
 | GET_MEMBERS_ACTION
 | SEARCH_MEMBERS_ACTION
