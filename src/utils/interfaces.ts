//Persos
export interface dataFields {
    pseudo:string;
    persoName:string;
}

export interface persoCard extends dataFields {
    id:string;
}

//Fruity
export interface fruitFields {
    name:string;
    url: string;
    price: number;
    id: string;
}

export interface cartFruitFields extends fruitFields {
    quantity: number
}

export interface usersFields {
    id: string;
    name: string;
    username: string;
    email: string;
    address: object;
    phone: string;
    website: string;
    geo: object;
}

export interface fetchFields {
    loading: boolean;
    data: usersFields[] | null;
    error: boolean;
}

export interface chronoFields {
    value: number;
    intervalID: number | null;
}

export interface taskFields {
    value?: string;
    id: string;
    priority?: string;
}

export interface shadowFields {
    [key:string]:string|boolean|number|undefined;
    active: boolean;
    inset: boolean;
    horizontal_offset: number;
    vertical_offset: number;
    blur_radius: number;
    spread_radius: number;
    color: string;
    id:string;
}

interface boxParamsFields {
    [key:string]:string|boolean|number|undefined;
    border_radius: number;
    height: number;
    width: number;
    background_color: string;
}

export interface boxFields {
    shadows: shadowFields[];
    box_params: boxParamsFields; 
}