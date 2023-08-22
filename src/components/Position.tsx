import { FormEvent } from "react";

interface positionProps {
    positionActual:boolean;
    setPositionActual:(state:boolean)=>void;
    submitNewCoord:(e:FormEvent)=>void;
}

export default function Position(props:positionProps) {
    const { positionActual,setPositionActual,submitNewCoord } = props;
  return (
    <section className="position">
        <p>{positionActual ? "votre position" : "entrez une position"}</p>
        <button className={"current-btn" + (positionActual ? "" : " custom")} onClick={() => setPositionActual(!positionActual)}><div className="inside"></div></button>
        {positionActual ? <></> : <form onSubmit={submitNewCoord}>
          <label htmlFor="lat">Latitude</label>
          <input type="text" name="lat" />
          <label htmlFor="lon">Longitude</label>
          <input type="text" name="lon" />
          <button className="submit"></button>
        </form>}
     </section>
  )
}