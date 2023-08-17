//Persos
export class NewCard {
    constructor (
      public pseudo:string,
      public persoName:string,
      public id:string
    ) {}
}

export class NewPerso {
    constructor (
      public pseudo:string,
      public persoName:string
    ) {}
}

//Fruity
export class NewFruit {
    constructor (
        public name:string,
        public url: string,
        public price: number,
        public id: string
    ) {}
}

//Boxy
export class NewShadow {
    constructor (
        public active: boolean,
        public inset: boolean,
        public horizontal_offset: number,
        public vertical_offset: number,
        public blur_radius: number,
        public spread_radius: number,
        public color: string,
        public id: string
    ) {}
}