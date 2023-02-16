import React, { useState } from "react";
import { Link } from 'react-router-dom';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './Navbar.css';




function Navbar(props) {
    const [state, setState] = useState({
        format: "hex", open: false
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({ ...state, open: false });
    };

    const { level, changeLevel, showingAllColors } = props;
    const { format } = state;

    const handleChangeFormat = (e) => {
        setState({ format: e.target.value, open: true })
        props.handleChange(e.target.value)
    }

    return (
        <header className="Navbar">
            <div className="logo">
                <Link to="/">ReactColorPalettes</Link>
            </div>
            {showingAllColors && (
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                            trackStyle={{ backgroundColor: 'transparent', height: '8px' }}
                            handleStyle={{ backgroundColor: 'cyan', height: 17, width: 17, outline: 'none', boxShadow: 'none', marginLeft: '-3px', marginTop: '-5px' }}
                            railStyle={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '8px' }}
                            defaultValue={level}
                            step={100} min={100} max={900}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
            )}
            <div className="select-container">
                <Select value={state.format} onChange={handleChangeFormat}>
                    <MenuItem value="hex">Hex - #1234EF</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={state.open}
                autoHideDuration={2500}
                onClose={handleClose}
                message={<span id='message-id'>Format Changed to {format.toUpperCase()}</span>}
                ContentProps={{ "aria-describedby": 'message-id' }}
                action={[
                    <IconButton onClick={handleClose} color='inherit' key='close' aria-label="close">
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </header>
    )
}

export default Navbar;