import { Container } from "@mui/material"
import GameComponent from "./components/game/GameComponent"

export const MainPage = () => {
    return (
        <Container maxWidth="xl">
            <GameComponent></GameComponent>
        </Container>
    )
}