export default function ThreePointsMenu({showMenu,setShowMenu}:{showMenu:boolean,setShowMenu:(state:boolean) => void}) {

  return (
    <div className="three-points-menu" onClick={() => setShowMenu(!showMenu)}>
        <div className="popup-window below">Menu</div>
        <div className="points"></div>
        <div className="points"></div>
        <div className="points"></div>
    </div>
  )
}