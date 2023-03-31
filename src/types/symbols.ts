// symbols.ts
import { InjectionKey } from 'vue';
import { DataStore } from '@/types/store';



export const DataStoreKey: InjectionKey<DataStore> = Symbol('DataStore');