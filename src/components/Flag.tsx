import { RefObject, useState } from "react";
import { countryObject } from "../utils/interfaces";
import { createPortal } from "react-dom";
import Modal from "./Modal";

export default function Flag({ country,geoPageRef }:{country:countryObject,geoPageRef:RefObject<HTMLDivElement>}) {
    const [showModal, setShowModal] = useState(false);

    const closeFunc = () => {
        setShowModal(false);
        console.log(geoPageRef);
    }
    
    const currentGeoPage = geoPageRef.current || document.body;

  return (
    <div className="flag">
        <div className="country-btn">{country.name.common}</div>
        <img src={country.flags.svg} alt={country.name.common} onClick={() => setShowModal(true)} />
        {(showModal) ? createPortal(
        <Modal closeFunc={closeFunc} country={country} />,
        currentGeoPage
      ) : <></>}
    </div>
  )
}