/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Stack } from "@mui/material";
import { Component, ReactNode, useState } from "react";
import { FieldDataBomb, FieldDataEmpty, FieldDataNumber, GameSquare, IFieldData } from "../GameSquare";

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


export default function GameComponent() {
    const [columns, setColumns] = useState(8);
    const [rows, setRows] = useState(8);
    const [bombs, setBombs] = useState(8);

    let fieldMap: IFieldData[][] = Array(rows)
        .fill(0)
        .map(() => Array(columns).fill(new FieldDataEmpty()));

    for (let i = 0; i < bombs; i++) {
        const x = getRandomInt(0, columns);
        const y = getRandomInt(0, rows);

        fieldMap[y][x] = new FieldDataBomb();
    }

    
    const  calculateBombs = (array: IFieldData[][], position: {x: number, y: number}):number => {
        let number = 0;
        
        const left = position.x - 1;
        const rigth = position.x + 1;
        const top = position.y - 1;
        const bottom = position.y + 1;
        
        
        if (left >= 0) {
            number += array[position.y][left] instanceof FieldDataBomb ? 1 : 0;
        }
        
        if (rigth < array[0].length) {
            number += array[position.y][rigth] instanceof FieldDataBomb ? 1 : 0; 
        }
        
        if (top >= 0) {
            number += array[top][position.x] instanceof FieldDataBomb ? 1 : 0; 
            if (left >= 0) {
                number += array[top][left] instanceof FieldDataBomb ? 1 : 0; 
            }
            
            if (rigth < array[0].length) {
                number += array[top][rigth] instanceof FieldDataBomb ? 1 : 0; 
            }
        }
        
        if (bottom < array.length) {
            number += array[bottom][position.x] instanceof FieldDataBomb ? 1 : 0;
            if (rigth < array[0].length) {
                number += array[bottom][rigth] instanceof FieldDataBomb ? 1 : 0; 
            }
            
            if (left >= 0) {
                number += array[bottom][left] instanceof FieldDataBomb ? 1 : 0; 
            }
        }
        
        return number;
        
    }
    
    fieldMap = fieldMap.map((row, i) => 
        row.map((element, j) => {
            if (element instanceof FieldDataBomb) {
                return element;
            }

            const value = calculateBombs(fieldMap, {x: j, y: i});

            return value == 0 ? new FieldDataEmpty() :new FieldDataNumber(value);
        })
    )
    
    const clearSpot = ({x, y}: {x: number, y: number}) => {
        const el = fieldMap[y][x];
        
        if (el.flagged) {
            return;
        }

        if (el.revealed) {
            return;
        } else {
            el.reveal(true);
            el.revealed = true;
        }

        if (el instanceof FieldDataBomb) return;
        
        
        if (el instanceof FieldDataNumber) {
            return;
        }


        const left = x - 1;
        const rigth = x + 1;
        const top = y - 1;
        const bottom = y + 1;

        if (left >= 0) {
            clearSpot({x: left, y});
        }

        if (left >= 0 && top >= 0) {
            clearSpot({x: left, y: top});
        }
       
        if (left >= 0 && bottom < rows) {
            clearSpot({x: left, y: bottom});
        }

        if (top >= 0) {
            clearSpot({x, y: top});
        }

        if (rigth < columns && top >= 0) {
            clearSpot({x: rigth, y: top});
        }
       
        if (rigth < columns && bottom < rows) {
            clearSpot({x: rigth, y: bottom});
        }
        
        if (rigth < columns) {
            clearSpot({x: rigth, y});
        }
        
        if (bottom < rows) {
            clearSpot({x, y: bottom});
        }
    }
    
    const clickHandler = ({ x, y }: {x:number, y:number}) => {
        clearSpot({x, y});
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