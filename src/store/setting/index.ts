import pinia from '@/store';

export const useSettingStoreWithout = defineStore('SettingStore', {
    state: () => ({
        title: [] as string[]
    }),
    actions: {
        setTitle(title: string[]) {
            this.title = title;
        }
    }
});

export const useSettingStore = () => useSettingStoreWithout(pinia);
