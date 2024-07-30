import { Button,  FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";

type OptionsBarProps = {
    rows: number,
    setRows: (value: number) => void,
    columns: number,
    setColumns: (value: number) => void,
    difficulty: Difficulty,
    setDifficulty: (value: Difficulty) => void
}

export const difficulties = ["Easy", "Medium", "Hard", "Expert"] as const;
export type Difficulty = typeof difficulties[number];


export default function OptionsBar({rows, setRows, columns, setColumns, difficulty, setDifficulty}: OptionsBarProps) {

    const [rowInput, setRowInput] = useState(String(rows))
    const [columnInput, setColumnInput] = useState(String(columns))

    const handleRowChange = (e:string) => {
        setRowInput(e)
        
        let number;
        
        try { number = parseInt(e) }
        catch { number = 1 }

        setRows(number > 0 ? number : 1)
    }
    const handleColumnChange = (e:string) => {
        setColumnInput(e)
        
        let number;
        
        try { number = parseInt(e) }
        catch { number = 1 }

        setColumns(number > 0 ? number : 1)
    }

    const handleDifficultyChange = (e: string) => {
        setDifficulty(e as Difficulty);
    }

    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-evenly">
            <TextField
                id="rows-input"
                label="Rows"
                variant="outlined"
                value={rowInput}
                onChange={(e) => handleRowChange(e.target.value)}
            />
            <TextField
                id="columns-input"
                label="Columns"
                variant="outlined"
                value={columnInput}
                onChange={(e) => handleColumnChange(e.target.value)}
            />

            <FormControl>
                <InputLabel id="difficulty-label" sx={{ backgroundColor: "background.paper" }}>Difficulty</InputLabel>
                <Select id="difficulty-select" sx={{width: 300}} labelId="difficulty-label" value={difficulty.toString()} onChange={(e) => handleDifficultyChange(e.target.value)}>
                    {difficulties.map((x, index) => (
                        <MenuItem key={index} value={x.toString()}>
                            {x}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="outlined"></Button>
        </Stack>
    )

}