import axios from 'axios';
const memberUrl = 'https://sandbox.glofox.com/2.0/members?page=1&limit=5';

export const getMembersData = () => {
    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJzYW5kYm94Lmdsb2ZveC5jb20iLCJleHAiOjE1MTExOTIyNzYsImlhdCI6MTUwODUxMzg3NiwiaXNzIjoic2FuZGJveC5nbG9mb3guY29tIiwibmJmIjoxNTA4NTEzODc2LCJ1c2VyIjp7Il9pZCI6IjU5MTFhYzlhMTYzZDk2M2EwMjAwMDAwMCIsIm5hbWVzcGFjZSI6InRoZXdvZGZhY3RvcnkiLCJicmFuY2hfaWQiOiI1NmNkYzAxNTVjNDZiYjE3NmJiOTI1ODIiLCJmaXJzdF9uYW1lIjoiQ3VjdW1iZXIiLCJsYXN0X25hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlzU3VwZXJBZG1pbiI6ZmFsc2V9fQ.cVEXvLx0xhkXHLn_XbQj-8iU3bG3Vsn4vZbtQlD60PE'
    };
    const success = ({data}) => data;
    const error = () => [];
    return axios.get(memberUrl, {headers}).then(success).catch(error);
};
