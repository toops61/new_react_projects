export class NewMeteoInfos {
    constructor (
        public temp:string,
        public icon:string,
        public imageURL:string,
        public timezone:string,
        public dt:string,
        public arrayHours:{hour:string,temperature:string,icon:string}[],
        public arrayDays:{day:string,temperature:string,icon:string}[]
    ) {}
}

export class NewExtraMeteoInfos {
    constructor (
        public sun_up:string,
        public sun_down:string,
        public temp_feel:number,
        public humidity:number,
        public wind_speed:number,
        public description: string
    ) {}
}