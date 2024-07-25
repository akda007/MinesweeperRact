/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Stack } from "@mui/material";
import { Component, ReactNode, useState } from "react";
import { FieldDataBomb, FieldDataEmpty, FieldDataNumber, GameSquare, IFieldData } from "../GameSquare";

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const  calculateBombs = (array: IFieldData[][], position: {x: number, y: number}):number => {
    return 1;
}

export default function GameComponent() {
    const [columns, setColumns] = useState(8);
    const [rows, setRows] = useState(8);
    const [bombs, setBombs] = useState(8);

    const fieldMap: IFieldData[][] = Array(rows)
        .fill(0)
        .map(() => Array(columns).fill(new FieldDataEmpty()));

    for (let i = 0; i < bombs; i++) {
        const x = getRandomInt(0, columns);
        const y = getRandomInt(0, rows);

        fieldMap[y][x] = new FieldDataBomb();
    }

    // fieldMap.map((_, i) => {
    //     fieldMap.map((_, j) => {
    //         const value = calculateBombs(fieldMap, {x: j, y: i});

    //         fieldMap[i][j] = new FieldDataNumber(value);
    //     })
    // })


    const clickHandler = ({ x, y }: {x:number, y:number}) => {
        alert(`X: ${x} | Y: ${y}`);
    }

    return (
        <Box>
            {fieldMap.map((row, i) => 
                <Stack key={i} flexDirection="row" justifyContent="center">
                    {row.map((e, j) => 
                        <GameSquare clickHandler={clickHandler} element={e} coordinates={{x: j, y: i}} key={(i+j*100)}/>
                    )}        
                </Stack>
            )}
        </Box>
    )
}