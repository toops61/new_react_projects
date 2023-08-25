import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";
import ThreePointsMenu from "../components/ThreePointsMenu";

export default function CodeEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [codeEdit, setCodeEdit] = useState('html');

  const [areaObject, setAreaObject] = useState<{[key:string]:string}>({
    html_area:'',
    css_area:'',
    js_area:'',
  })

  const changeEdit = (e:React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    let elementChanged = target.parentElement?.className;
    elementChanged = elementChanged ? elementChanged.split('-btn')[0] : 'html';
    setCodeEdit(elementChanged);
  }

  const changeArea = (e:ChangeEvent) => {
    const tempObject : {[key:string]:string} = {...areaObject};
    const target = e.target as HTMLTextAreaElement;
    tempObject[target.name]=target.value;
    setAreaObject(tempObject);
  }

  return (
    <main className="code-editor-page">
      <header className="header">
        <div className="title">
          <div className="back-btn">
            <Link to='/'></Link>
          </div>
          <h1>The code editor</h1>
        </div>
        <button className={"show-preview" + (showPreview ? ' hide' : '')} onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>
        <ThreePointsMenu />
      </header>
      <section className="down-part">
        <div className="navbar-editor">
          <button className="html-btn" onClick={changeEdit}><p>HTML</p></button>
          <button className="css-btn" onClick={changeEdit}><p>CSS</p></button>
          <button className="js-btn" onClick={changeEdit}><p>JavaScript</p></button>
        </div>
        {showPreview ? <div className="editor-preview">
          <div 
            dangerouslySetInnerHTML={{__html: areaObject.html_area}}
          />
        </div> : 
        <div className="code-edit">
          {codeEdit === 'html' ? <textarea name='html_area' onChange={changeArea} value={areaObject.html_area}></textarea> : <></>}
          {codeEdit === 'css' ? <textarea name='css_area' onChange={changeArea} value={areaObject.css_area}></textarea> : <></>}
          {codeEdit === 'js' ? <textarea name='js_area' onChange={changeArea} value={areaObject.js_area}></textarea> : <></>}
        </div>}
      </section>
    </main>
  )
}