/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Stack } from "@mui/material";
import { useState } from "react";
import GameSquare from "../GameSquare";



export default function GameComponent() {
    const [columns, setColumns] = useState(8);
    const [rows, setRows] = useState(8);


    const clickHandler = (x:number, y:number) => {
        alert(x);
    }

    return (
        <Box>
            { Array.from({length: rows}).map( (_, i) => 
                <Stack key={i} flexDirection="row" justifyContent="center">
                    {Array.from({length: columns}).map((_ , j)=>
                        <GameSquare key={j} clickHandler={clickHandler} x={i} y={j}/>
                    )}
                </Stack>
            )}
        </Box>
    )
}