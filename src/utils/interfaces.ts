//Persos
export interface dataFields {
    pseudo:string;
    persoName:string;
}

export interface persoCard extends dataFields {
    id:string;
}

export interface boxParamsFields {
    [key:string]:string|boolean|number|undefined;
    border_radius: number;
    height: number;
    width: number;
    background_color: string;
}