import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Slider() {
  const [photosArray, setPhotosArray] = useState<string[]>([]);
  
  const [centerIndex, setCenterIndex] = useState(0);
  const [picturesObjectsArray, setPicturesObjectsArray] = useState<string[]>([]);
  const [slideShow, setSlideShow] = useState(false);

  const picturesRef = useRef<HTMLDivElement>(null);

  const movePictures = (way:string) => {
    if (picturesRef?.current?.className === 'pictures-container') {
      picturesRef.current.classList.add(`${way}-anim`);
      const lastIndex = photosArray.length-1;
      const newIndex = way === 'left' ? 
        (centerIndex > 0 ? (centerIndex-1) : lastIndex) :
        (centerIndex < lastIndex ? (centerIndex+1) : 0);
      setTimeout(() => {
        fillImages(way,newIndex);
      }, 1200);
      setCenterIndex(newIndex);
    }
  }
  
  //remove an element and add one
  const fillImages = (way:string,newIndex:number) => {
    const tempArray = [...picturesObjectsArray];
    const lastIndex = photosArray.length-1;
    if (way === 'right') {
      tempArray.shift();
      tempArray.push(photosArray[newIndex < lastIndex ? (newIndex+1) : 0]);
    } else {
      tempArray.pop();
      tempArray.splice(0,0,photosArray[newIndex > 0 ? (newIndex-1) : lastIndex]);
    }
    setPicturesObjectsArray(tempArray);
  }

    useEffect(() => {
      if (picturesObjectsArray.length && picturesRef?.current) (picturesRef.current.className = 'pictures-container');
    }, [picturesObjectsArray])
    

    useEffect(() => {
      const length = photosArray?.length;
      if (length) {
        const tempArray = [];
        tempArray.push(photosArray[0]);
        if (length > 1) {
          tempArray.splice(0,0,photosArray[length-1])
          tempArray.push(photosArray[1]);
        } 
        setPicturesObjectsArray(tempArray);
        setSlideShow(tempArray.length > 1 ? true : false);
      }
    }, [photosArray])
  
  useEffect(() => {
    //get all pictures in 1_slider folder
    const appartsPhotos = Object.values(import.meta.glob('../assets/1_slider/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }));
    if (appartsPhotos.length) {
      JSON.stringify(appartsPhotos) !== JSON.stringify(photosArray) && setPhotosArray(appartsPhotos);
      setSlideShow(appartsPhotos.length > 1 ? true : false);
    } 
  }, []);
  
  return (
    <main className="slider-page">
      <div className="back-home">
        <Link to='/'></Link>
      </div>
      <h1>Slider</h1>
      {picturesObjectsArray?.length > 1 ? <div className="index-shown">
        <p tabIndex={0}>{(centerIndex+1)+' / '+photosArray.length}</p>
      </div> : <></>}
      {slideShow ? <section className="pictures-slide" tabIndex={0}>
        <div className="arrow left" onClick={() => movePictures('left')} role="navigation" tabIndex={0}></div>
        <div className="top-section">
          {picturesObjectsArray.length ?
            <div className="pictures-container" ref={picturesRef}>
              <div className="picture-appart left">
                <img src={picturesObjectsArray[0]} alt="appart" />
              </div>
              <div className="picture-appart">
                <img src={picturesObjectsArray[1]} alt="appart" />
              </div>
              <div className="picture-appart right">
                <img src={picturesObjectsArray[2]} alt="appart" />
              </div>
            </div> : <></>}
        </div>
        <div className="arrow right" onClick={() => movePictures('right')} role="navigation" tabIndex={0}></div>
      </section> : 
      <section className="pictures-slide">
        <div className="picture-appart">
          {picturesObjectsArray.length ? <img src={picturesObjectsArray[0]} alt="appart" /> : <></>}
        </div>
      </section>}
    </main>
  )
}