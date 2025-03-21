export default function DieList(props) {
    return <div className="display-numbers">
            {props.diceList.map((element) => {
                return <BoxButton key={element.id} id={element.id} isHeld={element.isHeld} value={element.value} freezeButton={props.freezeButton}></BoxButton>})}
            </div>
}

function BoxButton(props) {
    return <button id={props.id} onClick={props.freezeButton} className={props.isHeld ? "green-button" : "blue-button"}>{props.value}</button>
}
