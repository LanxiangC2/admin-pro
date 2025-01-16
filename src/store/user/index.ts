import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin, refreshUserData, LoginRequest } from '@/api/user';
import { IUserState } from './types';

export const useUserStoreWithout = defineStore('user', {
    state: (): IUserState => ({
        username: 'lyric',
        accessToken: '',
        roles: ['common']
    }),
    getters: {},
    actions: {
        async storeUserLogin(data: LoginRequest) {
            const res = await userLogin(data);
            console.log('res', res);
            this.username = res.data.username;
            this.roles = res.data.roles;
            this.accessToken = res.data.accessToken;
            return res;
        },
        async stroeRefreshUserInfo() {
            if (this.username == 'lyric' && this.accessToken != '') {
                refreshUserData({
                    accessToken: this.accessToken
                })
                    .then((res) => {
                        this.username = res.data.username;
                        this.roles = res.data.roles;
                        this.accessToken = res.data.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = '';
                    });
            }
        }
    },
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        pick: ['accessToken', 'username', 'roles']
    }
});

export const useUserStore = () => useUserStoreWithout(pinia);
