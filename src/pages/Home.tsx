import { Link } from 'react-router-dom';
import logoReact from '../assets/react.svg';
import logoRedux from '../assets/redux-logo.svg';
import logoType from '../assets/Typescript_logo_2020.svg';

export default function Home() {
  return (
    <main className="home-page">
        <div className="images-logos">
            <div className="logo">
                <img src={logoReact} alt="react" />
            </div>
            <div className="logo">
                <img src={logoType} alt="typescript" />
            </div>
            <div className="logo">
                <img src={logoRedux} alt="redux" />
            </div>
        </div>
        <h1>10 projets React</h1>
        <p>Tirés d'<Link to='https://www.ecole-du-web.net/' target='_blank' rel='noopener' >Ecole du web</Link> et réadaptés avec Typescript</p>
        <nav>
            <ul>
                <li><Link to={'/slider'}>Slider</Link></li>
                <li><Link to={'/meteo'}>Meteo</Link></li>
                <li><Link to={'/geodata'}>Geodata</Link></li>
                <li><Link to={'/code-editor'}>Editeur de code</Link></li>
                <li><Link to={'/pomodoro'}>Pomodoro</Link></li>
                <li><Link to={'/linear-gradient'}>Dégradés linéaires</Link></li>
                <li><Link to={'/audio-player'}>Player audio</Link></li>
                <li><Link to={'/infinite-scroll'}>Scroll infini</Link></li>
                <li><Link to={'/e-commerce'}>E-commerce</Link></li>
                <li><Link to={'/note-book'}>Apllication de prises de notes</Link></li>
            </ul>
        </nav>
    </main>
  )
}