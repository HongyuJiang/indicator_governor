import * as axios from 'axios';

export function getAtomicIndicators (){
    return axios.get('/atomic')
}