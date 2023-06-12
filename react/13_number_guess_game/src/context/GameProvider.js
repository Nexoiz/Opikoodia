import {useState} from 'react';
import GameContext from '../GameContext';
import { useNavigate } from 'react-router-dom';

const GameProvider = (props) => {

    const [state,setState] = useState({
        playerName:"",
        targetNumber:"",
        noOfGuesses:"",
        minimumGuess:1,
        maximumGuess:100,
        message:""
    })

    const navigate = useNavigate();

    const startGame = (name) => {
        if(!name) {
            setState((state) => {
                return {
                    ...state,
                    message:"Please enter your name."
                }
            })
            return;
        }
        const target = Math.floor(Math.random() * 100 ) + 1;
        const message = "Hello "+name+". Guess a number between "+state.minimumGuess+" and "+state.maximumGuess+".";
        setState((state) => {
            return {
                ...state,
                playerName:name,
                message:message,
                targetNumber:target
            }
        })
        navigate("/game");
    }
}

export default GameProvider;