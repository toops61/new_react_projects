import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";
import ThreePointsMenu from "../components/ThreePointsMenu";

export default function CodeEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [codeEdit, setCodeEdit] = useState('html');
  const [showMenu, setShowMenu] = useState(false);

  const [areaObject, setAreaObject] = useState<{[key:string]:string}>({
    html_area:'',
    css_area:'',
    js_area:'',
  })

  const changeEdit = (e:React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    let elementChanged = target.className ? target.className : target.parentElement?.className;
    elementChanged = elementChanged ? elementChanged.split('-btn')[0] : 'html';
    setCodeEdit(elementChanged);
    setShowPreview(false);
  }

  const changeArea = (e:ChangeEvent) => {
    const tempObject : {[key:string]:string} = {...areaObject};
    const target = e.target as HTMLTextAreaElement;
    tempObject[target.name]=target.value;
    setAreaObject(tempObject);
  }

  //inside iframe
  const srcDoc = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>${areaObject.css_area}</style>
      </head>
      <body>
        ${areaObject.html_area}
        <script>${areaObject.js_area}</script>
      </body>
    </html>
  `

  return (
    <main className="code-editor-page">
      <header className="header">
        <div className="title">
          <div className="back-btn">
            <Link to='/'></Link>
          </div>
          <h1>The code editor</h1>
        </div>
        <div className="btn-container">
          <button className={"show-preview" + (showPreview ? ' hide' : '')} onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>
        <div className="end-header">
          <ThreePointsMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </header>
      <section className="down-part">
        {showMenu ? <div className="menu-editor">
          <button className="html-btn" onClick={changeEdit}><p>HTML</p></button>
          <button className="css-btn" onClick={changeEdit}><p>CSS</p></button>
          <button className="js-btn" onClick={changeEdit}><p>JavaScript</p></button>
        </div> : <></>}
        {showPreview ? <div className="editor-preview">
          <iframe srcDoc={srcDoc} sandbox="allow-scripts"></iframe>
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