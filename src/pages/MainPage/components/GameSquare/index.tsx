/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, ReactNode } from "react";
import { GameSquareElement } from "./styles";
import { Box, BoxProps } from "@mui/material";

type GameSquareProps = {
    coordinates: {x: number, y: number}
    clickHandler: (coordinates:{x: number, y: number}) => void;
    element: IFieldData;
}

class IFieldData {
    value: unknown;

    constructor (value: unknown) {
        this.value = value;
    }
}

class FieldDataBomb extends IFieldData {
    constructor () {
        super("X");
    }
}

class FieldDataEmpty extends IFieldData {
    constructor() {
        super("");
    }
}

class FieldDataNumber extends IFieldData {
    constructor(value: number) {
        super(value);
    }
}

const GameSquare = (props: GameSquareProps) => {
    return (
        <GameSquareElement onClick={() => props.clickHandler(props.coordinates)}>
            {String(props.element.value)}
        </GameSquareElement>
    )
};

export { IFieldData, FieldDataBomb, FieldDataEmpty, FieldDataNumber, GameSquare }