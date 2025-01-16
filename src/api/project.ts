import { get } from '@/http/request';

export const getProjectList = async (data?: any) => {
    return get({}, '/projects', data);
};
