import { meteoAlertsObject } from "../utils/interfaces";

export default function AlertMeteo({alertObject}:{alertObject:meteoAlertsObject}) {
    
    return (
        <div className="alert">
            <h3>{alertObject.event}</h3>
            <p>Du {new Date(alertObject.start * 1000).toLocaleString('fr-FR')} au {new Date(alertObject.end * 1000).toLocaleString('fr-FR')}</p>
            <p className="alert-descr">{alertObject.description}</p>
        </div>
    )
}