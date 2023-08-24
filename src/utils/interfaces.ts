//Persos
export interface dataFields {
    pseudo:string;
    persoName:string;
}

interface dailyHourlyObj {
    [key:string]:unknown,
    dt:number,
    weather:weatherObj[]
}

interface dailyObj extends dailyHourlyObj {temp:{
    day: number, 
    min: number, 
    max: number, 
    night: number, 
    eve: number,
    morn: number
}}

interface hourlyObj extends dailyHourlyObj {temp:number}

interface weatherObj {
    description:string,
    icon:string,
    id:number,
    main:string
}

export interface meteoAlertsObject {
    sender_name:string,
    event:string,
    start:number,
    end:number,
    description:string,
    tags:string[],
    id?:string
}
export interface meteoResultData {
    [key:string]:unknown,
    lat:number,
    lon:number,
    timezone:string,
    timezone_offset:number,
    current:{
        clouds:number,
        dew_point:number,
        dt:number,
        feels_like:number,
        humidity:number,
        pressure:number,
        sunrise:number,
        sunset:number,
        temp:number,
        uvi:number,
        visibility:number,
        weather:weatherObj[],
        wind_deg:number,
        wind_speed:number
    },
    daily:dailyObj[],
    hourly:hourlyObj[],
    alerts?:meteoAlertsObject[],
}

interface countriesType {
    area:number,
    capital:string[],
    coatOfArms?:{
        png:string,
        svg:string
    },
    flags:{
        alt:string,
        png?:string,
        svg:string
    },
    population:string
}
export interface geoDataResult extends countriesType {
    [key:string]:unknown,
    currencies:{
        [key:string]:{name:string, symbol:string}
    },
    languages:{
        [key:string]:string
    },
    name:{
        common:string,
        nativeName:{
            [key:string]:{official:string,common:string},
        },
        official:string
    }
}
export interface countryObject extends countriesType {
    id:string,
    currencies:{name:string, symbol:string,short:string},
    languages:string[],
    name:{
        common:string,
        nativeName:{
            official:string,
            common:string
        },
        official:string
    }
}