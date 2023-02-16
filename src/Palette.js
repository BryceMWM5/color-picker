import React from 'react';
import { useState } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';


function Palette(props) {
    const [state, setState] = useState({
        level: 500, format: "hex"
    });

    const { level, format } = state;
    const { colors, paletteName, emoji } = props.palette;

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} key={color.id} color={color.id} palette={props} showLink />
    ))

    const changeLevel = (level) => {
        setState({ ...state, level: level });
    }

    const changeFormat = (val) => {
        setState({ ...state, format: val });
    }

    return (
        <div className='Palette'>
            <Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat} showingAllColors />
            <div className='Palette-colors'>
                {colorBoxes}
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
}

export default Palette;