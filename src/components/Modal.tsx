import { countryObject } from "../utils/interfaces";

interface propsType {
    closeFunc: () => void;
    country: countryObject
}

export default function Modal({closeFunc,country}:propsType) {
    const languages = country.languages.map((e,index) => e + (index < (country.languages.length-1) ? ', ' : ''));

  return (
    <div className="modal">
        <div className="modal-inside">
            <div className="background-arms">
                <img src={country?.coatOfArms?.svg} alt='coat of arms' />
            </div>
            <div className="over-background">
                <button className="close-modal" onClick={closeFunc}></button>
                <h2>{country.name.common} ({country.name.nativeName.official})</h2>
                <p><span>Superficie : </span>{country.area} km2</p>
                <p><span>Capitale : </span>{country.capital[0]}</p>
                <p><span>Monnaie : </span>{country.currencies.name} ({country.currencies.symbol})</p>
                <p><span>Population : </span>{country.population} habitants</p>
                <p><span>Langue(s) : </span>{languages}</p>
            </div>
        </div>
    </div>
  )
}