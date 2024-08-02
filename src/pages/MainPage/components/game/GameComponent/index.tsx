/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldDataBomb, FieldDataEmpty, FieldDataNumber, GameSquare, IFieldData } from "../GameSquare";
import OptionsBar, { difficulties, Difficulty } from "../../ui/OptionsBar";
import { v4 as uuidv4 } from 'uuid';

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function GameComponent() {
    const [columns, setColumns] = useState(12);
    const [rows, setRows] = useState(8);
    const [difficulty, setDifficulty] = useState("Medium");
    const [fieldMap, setFieldMap] = useState<IFieldData[][] | null>([])
    const [running, setRunning] = useState(false);
    const [exploded, setExploded] = useState(false);
    const [open, setOpen] = useState(false);

    const bombs = Math.ceil((columns * rows) * 0.05 * (difficulties.indexOf(difficulty as Difficulty) + 1));

    useEffect(() => {
        const tmpMap = Array(rows).fill(0).map(() => Array(columns).fill(new FieldDataEmpty()));
        
        for (let i = 0; i < bombs; i++) {
            const x = getRandomInt(0, columns);
            const y = getRandomInt(0, rows);
            
            tmpMap[y][x] = new FieldDataBomb();
        }
        
        tmpMap.forEach((row, i) => {
            row.forEach((element, j) => {
                if (element instanceof FieldDataBomb) {
                    return;
                }
                
                const value = calculateBombs(tmpMap, {x: j, y: i})
                
                tmpMap[i][j] = value == 0 ? new FieldDataEmpty() : new FieldDataNumber(value);
            })
        })

        setFieldMap(tmpMap)
    }, [rows, columns, difficulty, bombs, running])

    const clearSpot = ({x, y}: {x: number, y: number}) => {
        if(!fieldMap) return 

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
        if (!fieldMap) {
            return;
        }
        
        clearSpot({x, y});
        
        if (fieldMap[y][x] instanceof FieldDataBomb) {
            setExploded(true);
            setOpen(true);
        }
    }

    const startGame = () => {
        setRunning(true);
    }



    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box 
                    sx={style}
                >
                    <Typography>You lost!</Typography>
                    <Button variant="outlined" onClick={(e) => {setRunning(false); setOpen(false)}}>Ok</Button>
                </Box>
            </Modal>
            <OptionsBar
                rows={rows}
                columns={columns}
                setColumns={setColumns}
                setRows={setRows}
                difficulty={difficulty as Difficulty}
                setDifficulty={setDifficulty}
                startGame={startGame}
                />

            {running &&
                <Box marginTop={5}>
                {fieldMap && fieldMap.map((row, i) => 
                    <Stack
                        key={uuidv4()}
                        flexDirection="row"
                        justifyContent="center" 
                    >
                        {row.map((e, j) => 
                            <GameSquare clickHandler={clickHandler} element={e} coordinates={{x: j, y: i}} key={uuidv4()}/>
                        )}        
                    </Stack>
                )}
            </Box>
            }
        </>
    )
}