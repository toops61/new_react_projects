import { boxFields, taskFields } from "./interfaces";

//replace obj with same id in array
export const replaceArray = (array:taskFields[],obj:taskFields,action:string) => {
    const tempArray = array.map(e => {return {...e}});
    const previousId = tempArray.findIndex(e => e.id === obj.id);
    if (previousId !== -1) {
        action ? tempArray.splice(previousId,1) : tempArray.splice(previousId,1,obj);
    } 
    return tempArray;
}

export const shadowsToString = (boxParamsState:boxFields) => {
    let tempString = '';
    if (boxParamsState?.shadows?.length && boxParamsState?.shadows?.some(e => e.active)) {
        boxParamsState.shadows.map(shadow => {
            tempString += (shadow.active ? `${shadow.inset ? 'inset ' : ''}${shadow.horizontal_offset}px ${shadow.vertical_offset}px ${shadow.blur_radius}px ${shadow.spread_radius}px ${shadow.color},` : '');
            return shadow;
        })
    } else {
        tempString = 'none';
    }
    if (tempString.charAt(tempString.length-1) === ',') (tempString = tempString.slice(0,-1));
    return tempString;
}