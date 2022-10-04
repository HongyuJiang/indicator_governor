import * as axios from 'axios';

export function getAtomicIndicators() {
    return axios.post('/atomic')
}

export function getCommonDimensions() {
    return axios.post('/dimension')
}

export function getAttributes() {
    return axios.post('/attributes')
}

export function getStatRule() {
    return axios.post('/stat_rules')
}