import { nanoid } from "nanoid";
import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { meteoAlertsObject, meteoResultData } from "../utils/interfaces";
import { NewExtraMeteoInfos, NewMeteoInfos } from "../utils/classes";
import Position from "../components/Position";
import Loader from "../components/Loader";
import AlertMeteo from "../components/AlertMeteo";

const APIKEY = import.meta.env.VITE_METEOKEY;

export default function Meteo() {
  const [apiKey, setApiKey] = useState('');
  const [jsonResult, setJsonResult] = useState<meteoResultData|null>(null);
  const [jsonCoordinates, setJsonCoordinates] = useState<{latitude:number,longitude:number}|null>(null);
  //const [night, setNight] = useState(false);
  const [callData, setCallData] = useState(false);
  const [infoToDisplay, setInfoToDisplay] = useState({...new NewMeteoInfos('','','','','',[],[])});
  const [extraInfos, setExtraInfos] = useState({...new NewExtraMeteoInfos('','',0,0,0,'')});
  const [meteoDaysDisplayed, setMeteoDaysDisplayed] = useState(false);
  const [moreInfos, setMoreInfos] = useState(false);

  const [showPrevisions, setShowPrevisions] = useState(false);
  const [positionActual, setPositionActual] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  
  const [loading, setLoading] = useState(true);

  //const [checkSection, setCheckSection] = useState(true);
  //fetch function
  const inputSearchQuery = async () => {
    const url = apiKey ? `https://api.openweathermap.org/data/3.0/onecall?lat=${jsonCoordinates?.latitude}&lon=${jsonCoordinates?.longitude}&exclude=minutely&appid=${apiKey}&lang=fr` : '';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const result = await response.json();
      setCallData(false);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.log(error);
      /* const message = error instanceof Error ? error.message : '';
      return {message}; */
    }
  }

  //get json from search query
  const { data,isLoading,refetch } = useQuery(
    'meteo',
    inputSearchQuery,
    {
      enabled: false,
      cacheTime: 1800000,
      staleTime:1800000,
      retryDelay:10000
    }
  )

  const convertDt = (dateTime:number) => new Date(dateTime * 1000).getHours() + "h";

  const fillHoursTemp = () => {
    const arrayTemp = [];
    for (let i = 1; i < 8; i++) {
        const resultHour = jsonResult?.hourly[i*3] || {dt:0,temp:0,weather:[{icon:''}]};
        arrayTemp.push({
            hour: convertDt(resultHour.dt),
            temperature: Math.round(resultHour.temp - 273.15) + '°',
            icon: resultHour.weather[0].icon
        })
    }
    return arrayTemp;
}

  const fillDaysTemp = () => {
    const arrayTemp = [];
    const arrayDays = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
    for (let i = 1; i < 8; i++) {
      const resultDay = jsonResult?.daily[i] || {dt:0,temp:{day:0},weather:[{icon:''}]};
        const day = new Date(resultDay.dt*1000).getDay();        
        arrayTemp.push({
            day: arrayDays[day],
            temperature: Math.round(resultDay.temp.day - 273.15) + '°',
            icon: resultDay.weather[0].icon
        })
    }
    return arrayTemp;
  }

  //fill object with extra infos
  const fillExtraObject = () => {
    const extraObject = {...extraInfos};
    const resultInfos = jsonResult?.current;

    const sunSecondsUp = resultInfos?.sunrise || 0;
    const sunSecondsDown = resultInfos?.sunset || 0;

    const sunTimeUp = new Date(sunSecondsUp*1000).toLocaleTimeString();
    const sunTimeDown = new Date(sunSecondsDown*1000).toLocaleTimeString();
    extraObject.sun_up = sunTimeUp.substring(0,(sunTimeUp.length-3));
    extraObject.sun_down = sunTimeDown.substring(0,(sunTimeDown.length-3));

    extraObject.temp_feel = (Math.round(((resultInfos?.feels_like || 0) - 273.15)*10))/10;

    extraObject.humidity = resultInfos?.humidity || 0;

    const windSpeed = (resultInfos?.wind_speed || 0)*3.6;
    extraObject.wind_speed = Math.round(windSpeed * 100) / 100;

    extraObject.description = resultInfos?.weather[0].description || '';

    setExtraInfos(extraObject);
  }

  //get fetched data infos and fill fields
  const fillInfos = () => {
    const tempObject = {...infoToDisplay};
    const icon =  jsonResult?.current.weather[0].icon || '';
    tempObject.imageURL =  `https://openweathermap.org/img/wn/${icon}@2x.png`;
    //setNight(icon.includes('n') ? true : false);
    const temp = jsonResult?.current.temp || 0;
    tempObject.temp = Math.round(temp - 273.15) + '°';
    tempObject.arrayHours = fillHoursTemp();
    tempObject.arrayDays = fillDaysTemp();
    tempObject.timezone = jsonResult?.timezone || '';
    tempObject.dt = new Date((jsonResult?.current.dt || 0)*1000).toLocaleString();
    setInfoToDisplay({...tempObject});
    fillExtraObject();
  }

  //save coordinates in state
  const saveCoordinates = (latitude:number,longitude:number) => {
    const lat = Math.round(latitude * 1000) / 1000;
    const lon = Math.round(longitude * 1000) / 1000;
    const tempObject = {
      latitude:lat,
      longitude:lon
    }
    setJsonCoordinates({...tempObject});
  }

  //find coordinates from position
  const getCoordinates = () => {
    try {navigator.geolocation.getCurrentPosition(position => {
      saveCoordinates(position.coords.latitude,position.coords.longitude);
    })} catch (error) {
      console.log(error);
      alert('"vous devez autoriser votre position"');
      //"On ne peut vous donner la météo sans votre localisation. Autorisez la svp."
    }
  }

  //fetch meteo data if no previous data, older than 2h or new coordinates
  const checksOldData = () => {
    const nullishCoordinates = (jsonCoordinates?.latitude || jsonCoordinates?.longitude) ?? 'none';
    
    if (sessionStorage.meteoData) {
      const actualDateTime = new Date().getTime();
      const storedData = JSON.parse(sessionStorage.getItem('meteoData') || '');
      const storedDt = storedData.current.dt*1000;
      const difference = actualDateTime - storedDt;
      let recall = false;
      difference < 3600000 ? setJsonResult(storedData) : (recall = true);
      if (jsonCoordinates && (nullishCoordinates !== 'none') && (jsonCoordinates.latitude !== storedData.lat || jsonCoordinates.longitude !== storedData.lon)) recall = true;
      if (recall && apiKey && nullishCoordinates !== 'none') setCallData(true);
      !recall && setLoading(false);
    } else {      
      (apiKey && (nullishCoordinates !== 'none')) && setCallData(true);
    }
  }

  //get manual coordinates
  const submitNewCoord = (e:FormEvent) => {
    e.preventDefault();
    const lat = (e.target as HTMLInputElement).childNodes[1] as HTMLInputElement;
    const lon = (e.target as HTMLInputElement).childNodes[3] as HTMLInputElement;

    const latNumb = !isNaN(parseFloat(lat.value)) ? parseFloat(lat.value) : 0;
    const lonNumb = !isNaN(parseFloat(lon.value)) ? parseFloat(lon.value) : 0;
    
    const newLat = Math.round(latNumb * 1000) / 1000;
    const newLon = Math.round(lonNumb * 1000) / 1000;

    const tempObject = {
      latitude:newLat,
      longitude:newLon
    }
    setJsonCoordinates(tempObject);
  }

  const keySubmit = (e:FormEvent) => {
    e.preventDefault();
    const keyEntered = (e.target as HTMLInputElement).childNodes[1] as HTMLInputElement;
    setApiKey(keyEntered.value);
  }

  useEffect(() => {
    APIKEY && setApiKey(APIKEY);
    setTimeout(() => {
      setJsonCoordinates(state => {
        const coordinates = (state?.latitude || state?.longitude) ?? 'none';
        if (coordinates === 'none') {
          setLoading(false);
          alert('Coordonées non trouvées, entrez coordonnées manuelles');
          setPositionActual(false);
        }
        return state;
      })
    }, 5000);
  }, [])

  useEffect(() => {
    positionActual && getCoordinates();
  }, [positionActual])

  useEffect(() => {
    jsonResult && fillInfos();
  }, [jsonResult])

  useEffect(() => {
    checksOldData();
  }, [jsonCoordinates,apiKey])
  
  useEffect(() => {
    if (data?.current) {
      const alertsArray = data.alerts ? data.alerts.map((e:meteoAlertsObject) => ({...e,id:nanoid(8)})) : [];
      const tempObject = alertsArray.length ? {...data,alerts:alertsArray} : data;
      setJsonResult(tempObject);
      sessionStorage.setItem('meteoData',JSON.stringify(tempObject));
    }
  }, [data])

  useEffect(() => {
    callData && refetch();
  }, [callData])
  
  
  const HoursDisplayed = () => {
    return (
      infoToDisplay.arrayHours.map(el => {
        return (
          <div className="temp-container" key={nanoid(8)}>
            <h4>{el.hour}</h4>
            <p>{el.temperature}</p>
            <div className="icon-mini">
              <img src={`https://openweathermap.org/img/wn/${el.icon}@2x.png`} alt="hours-icons" />
            </div>
          </div>
        )
      })
    )
  }

  const DaysDisplayed = () => {
    return (
      infoToDisplay.arrayDays.map(el => {
        return (
          <div className="temp-container" key={nanoid(8)}>
            <h4>{el.day}</h4>
            <p>{el.temperature}</p>
            <div className="icon-mini">
              <img src={`https://openweathermap.org/img/wn/${el.icon}@2x.png`} alt="days-icons" />
            </div>
          </div>
        )
      })
    )
  }

  return (
    <main className="meteo-page">
      {/* {checkSection ? <div className="check-section">
        <p>API key : {apiKey ? 'OK' : 'none'}</p>
        <p>coordinates : {(jsonCoordinates?.latitude || jsonCoordinates?.longitude) ?? 'none'}</p>
      </div> : <></>} */}
      <div className="back-home">
        <Link to='/'></Link>
      </div>
      {apiKey ? <></> : <form className="api-form" onSubmit={keySubmit}>
        <label htmlFor="manual_api"><Link to='https://home.openweathermap.org/subscriptions/billing_info/onecall_30/base?key=base&service=onecall_30' target="_blank" rel='noopener'>API key</Link></label>
        <input type="password" name="manual_api" />
        <button className="submit"></button>
      </form>}
      {showAlert ? <div className="alert-window">
        <button className="close-alert" onClick={() => setShowAlert(false)}></button>
        {jsonResult?.alerts?.map(alertObject => <AlertMeteo key={alertObject.id} alertObject={alertObject} />)}
      </div> : <></>}
      <Position 
        positionActual={positionActual} 
        setPositionActual={setPositionActual} 
        submitNewCoord={submitNewCoord} />
      {isLoading || loading ? <Loader /> : <>
        <section className="meteo-section">
          <div className="meteo-container">
            {jsonResult?.alerts?.length ? <button className="alert-btn" onClick={() => setShowAlert(true)}></button> : <></>}
            <button className={"plus-btn" + (moreInfos ? " less" : "")} onClick={() => setMoreInfos(!moreInfos)}></button>
            <div className="picto-container">
              <img src={infoToDisplay.imageURL} alt="meteo icon" />
            </div>
            <div className="infos">
              <p className="temp">Température : {infoToDisplay.temp}</p>
              <p>{infoToDisplay.timezone}</p>
              <p>{infoToDisplay.dt}</p>
            </div>
            {showPrevisions ? <button className="days-hours" onClick={() => setMeteoDaysDisplayed(!meteoDaysDisplayed)}>
              <p>{meteoDaysDisplayed ? 'days' : 'hours'}</p>
            </button> : <></>}
            <div className={"previsions-btn" + (showPrevisions ? " less" : "")} onClick={() => setShowPrevisions(!showPrevisions)}><p>prévisions</p></div>
          </div>
          {extraInfos ? <div className={"more-infos" + (moreInfos ? " visible" : "")}>
            <h2>Soleil</h2>
            <p><span>Lever : </span>{extraInfos.sun_up}</p>
            <p><span>Coucher : </span>{extraInfos.sun_down}</p>
            <p className="category"><span>Temp. ressentie : </span>{extraInfos.temp_feel}°</p>
            <p className="category"><span>Humidité : </span>{extraInfos.humidity}%</p>
            <p className="category"><span>Vent : </span>{extraInfos.wind_speed} km/h</p>
            <p className="category">{extraInfos.description}</p>
          </div> : <></>}
        </section>
        <div className={"previsions-container" + ( showPrevisions ? " visible" : "")}>
          {meteoDaysDisplayed ? <DaysDisplayed /> : <HoursDisplayed />}
        </div>
      </>}
    </main>
  )
}