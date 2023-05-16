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

export function addAtomic(atomic) {
    return axios.post('/add_atomic', atomic)
}

export function addDimension(dimension) {
    return axios.post('/add_dimension', dimension)
}

export function updateAtomic(params) {
    return axios.post('/update_atomic', params)
}

export function updateDimension(params) {
    return axios.post('/update_dimension', params)
}

export function deleteAtomic(params) {
    return axios.post('/delete_atomic', params)
}

export function deleteDimension(params) {
    return axios.post('/delete_dimension', params)
}