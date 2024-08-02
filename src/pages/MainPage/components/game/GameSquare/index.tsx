/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, MouseEventHandler, ReactNode, useState } from "react";
import { GameSquareElement } from "./styles";
import { Box, BoxProps, Stack, Typography } from "@mui/material";

import "./bombStyles.css"

type GameSquareProps = {
    coordinates: {x: number, y: number}
    clickHandler: (coordinates:{x: number, y: number}) => void;
    element: IFieldData;
}

class IFieldData {
    value: string;
    revealed: boolean = false;
    reveal: (value: boolean) => void = () => {};
    flagged: boolean = false;

    constructor (value: string) {
        this.value = value;
    }
}

class FieldDataBomb extends IFieldData {
    constructor () {
        super("");
    }
}

class FieldDataEmpty extends IFieldData {
    constructor() {
        super("");
    }
}

class FieldDataNumber extends IFieldData {
    constructor(value: number) {
        super(value.toString());
    }
}

const GameSquare = (props: GameSquareProps) => {
    const [revealed, setRevealed] = useState(props.element.revealed);
    const [flagged, setFlagged] = useState(props.element.flagged);

    props.element.reveal = setRevealed;
    props.element.flagged = flagged;
    
    const clickEvent = (event: any) => {
        props.clickHandler(props.coordinates);
    }

    const rightClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();

        if (props.element.revealed) return
        
        setFlagged(!flagged);
    }

    return (
        <>
            <GameSquareElement onClick={clickEvent} onContextMenu={rightClick} bgcolor={revealed ? "white" : "lightgray"}>
                   { !props.element.flagged &&
                    <>
                    { (props.element instanceof FieldDataNumber && revealed) && 
                        <Stack justifyContent="center" alignItems="center" height="100%">
                            <Typography className={`num-${props.element.value}`} variant="h6">
                                {props.element.value}
                            </Typography>
                        </Stack>
                    }
                    { (props.element instanceof FieldDataBomb && revealed) && 
                        <Stack justifyContent="center" alignItems="center" height="100%">
                            <Typography padding={0} margin={0} sx={{display: "flex", alignItems:"center"}}>
                                <span  className="material-symbols-outlined" style={{padding: 0, margin: 0, fontSize: "25px"}}>explosion</span>
                            </Typography>
                        </Stack>
                    }
                    </>
                   }
                   { props.element.flagged &&
                        <Stack justifyContent="center" alignItems="center" height="100%">
                            <Typography padding={0} margin={0} sx={{display: "flex", alignItems:"center"}}>
                                <span  className="material-symbols-outlined" style={{padding: 0, margin: 0, fontSize: "25px"}}>personal_places</span>
                            </Typography>
                        </Stack>
                   }
            </GameSquareElement>
        </>
    )
};

export { IFieldData, FieldDataBomb, FieldDataEmpty, FieldDataNumber, GameSquare }