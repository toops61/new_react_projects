import tsLogo from '../assets/Typescript_logo_2020.svg';
import reactLogo from '../assets/react.svg';
import reduxLogo from '../assets/redux-logo.svg';

export default function Loader() {
  return (
    <section className="loader-page">
        <div className="redux-image">
            <img src={reduxLogo} alt="redux" />
        </div>
        <div className="ts-image">
            <img src={tsLogo} alt="typescript" />
        </div>
        <div className="react-image">
            <img src={reactLogo} alt="react" />
        </div>
    </section>
  )
}