import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export default function SingleColorPalette(props) {

    const [state, setState] = useState({
        shades: [], format: "hex"
    });

    const { shades, format } = state;

    const { paletteName, emoji } = props.palette;

    const navigate = useNavigate();

    const changeFormat = (val) => {
        setState({ ...state, format: val });
    }

    const backButton = () => {
        navigate(-1);
    }

    useEffect(() => {
        async function gatherShades(palette, colorToFilterBy) {
            let shades = [];
            let allColors = palette.colors;

            for (let key in allColors) {
                shades = shades.concat(
                    allColors[key].filter(color => color.id === colorToFilterBy)
                )
            }
            return setState({
                ...state, shades: shades.slice(1)
            });
        }
        gatherShades(props.palette, props.colorId);
    }, [props.colorId, props.palette])

    const colorBoxes = shades.map(color => (
        <ColorBox showLink={false} key={color.name} name={color.name} background={color[format]} />
    ))

    return (
        <div className="SingleColorPalette Palette">
            <Navbar handleChange={changeFormat} showingAllColors={false} />
            <div className="Palette-colors">
                {colorBoxes}
                <div className="go-back ColorBox">
                    <button onClick={backButton} className="back-button">GO BACK</button>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
};