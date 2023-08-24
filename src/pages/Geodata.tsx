import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { geoDataResult } from "../utils/interfaces";
import { nanoid } from "nanoid";
import Flag from "../components/Flag";
import Loader from "../components/Loader";

export default function Geodata() {
  const [callData, setCallData] = useState(true);

  const geoPageRef = useRef<HTMLDivElement>(null);

  //fetch function
  const inputSearchQuery = async () => {
    const url = `https://restcountries.com/v3.1/region/europe`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }
      const result = await response.json();
      //setLoading(false);
      setCallData(false);
      return result;
    } catch (error) {
      //setLoading(false);
      console.log(error);
      setCallData(false);
      /* const message = error instanceof Error ? error.message : '';
      return {message}; */
    }
  }

  const handleData = (data:object) => {
    const tempArray = Object.values(data);
    const newArray = tempArray.map((country:geoDataResult) => {
      const currencies = Object.values(country.currencies)[0];
      const name = {...country.name,nativeName:(Object.values(country.name.nativeName)[0])}
      return {
        area:country.area,
        capital:country.capital,
        coatOfArms:country.coatOfArms,
        currencies:{...currencies,short:Object.keys(country.currencies)[0]},
        flags:country.flags,
        languages:Object.values(country.languages),
        name,
        population:country.population,
        id:nanoid(12)
      }
    })
    newArray.sort((a,b) => {
      const nameA = a.name.common;
      const nameB = b.name.common;
      return nameA < nameB ? -1 : 1;
    })
    return newArray;
  }

  //get json from search query
  const { data,isLoading,refetch } = useQuery(
    'meteo',
    inputSearchQuery,
    {
      enabled: false,
      select: data => handleData(data),
      cacheTime: 1800000,
      staleTime:1800000,
      retryDelay:10000
    }
  )

  useEffect(() => {
    callData && refetch();
  }, [callData])  

  return (
    isLoading ? <Loader /> : <main className="geodata-page" ref={geoPageRef} >
      <div className="back-home">
        <Link to='/'></Link>
      </div>
      <h1>Pays d'Europe</h1>
      <p>Cliquez sur les drapeaux pour plus d'infos</p>
      <div className="flags-container">
        {data ? data.map(country => (
          <Flag 
            country={country}
            key={country.id}
            geoPageRef={geoPageRef}
          />
        )) : <></>}
      </div>
    </main>
  )
}