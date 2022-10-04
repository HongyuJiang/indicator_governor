import _, { keys } from 'lodash'

const flatObject = (object) => {
    const flatten = []
    for(let key in object){
        flatten.push({'name': key, 'values': object[key].map((d) => d['维度值'])})
    }
    return flatten
}

export const bindAttr2Dim = (dims, attrs) => {

    const structedAttrs = _.groupBy(attrs, '维度')
    let nestedAttrs = {}
    for (let dim in structedAttrs){
        nestedAttrs[dim] =  flatObject(_.groupBy(structedAttrs[dim], '维度属性'))
    }
 
    return dims.map((dim) => {
        dim['属性'] = nestedAttrs[dim['维度']]
        return dim
    })
}