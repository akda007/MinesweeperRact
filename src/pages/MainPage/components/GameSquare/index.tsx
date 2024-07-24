/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameSquareElement } from "./styles";

type GameSquareProps = {
    x:number,
    y:number,
    clickHandler: (x:number, y:number) => void
}

export default function GameSquare({x, y, clickHandler}:GameSquareProps) {
    return (
        <>
            <GameSquareElement bgcolor="white" onClick={() => clickHandler(x, y)}/>
        </>
    )
}