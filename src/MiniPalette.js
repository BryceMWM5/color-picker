/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";

import { css } from '@emotion/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function MiniPalette(props) {

    const { colors, paletteName, emoji, openDialog, id, handleClick } = props;

    const miniColorBoxes = colors.map(color => (
        <div
            className="miniColor"
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));

    const deletePalette = (evt) => {
        evt.stopPropagation();
        openDialog(id);
    }


    return (
        <div onClick={() => handleClick(id)} className="root" css={css`
            background-color: white;
            border-radius: 5px;
            border: 1px solid black;
            padding: 0.5rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            &:hover svg{
                opacity: 1;
            }
            .colors {
                background-color: #dae1e4;
                height: 150px;
                width: 100%;
                border-radius: 5px;
                overflow: hidden;
            }
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0;
                color: black;
                padding-top: 0.5rem;
                font-size: 1rem;
                position: relative;
            }
            .emoji {
                margin-left: 0.5rem;
                font-size: 1.5 rem;
            }
            .miniColor {
                height: 25%;
                width: 20%;
                display: inline-block;
                margin: 0 auto;
                position: relative;
                margin-bottom: -3.5px;
            }
            .deleteIcon {
                color: white;
                background-color: #eb3d30;
                width: 20px;
                height: 20px;
                position: absolute;
                right: 0;
                top: 0;
                padding: 10px;
                z-index: 10;
                opacity: 0;
            }
        `}>
            <DeleteForeverIcon onClick={deletePalette} className="deleteIcon" style={{ transition: 'all 0.3s ease-in-out' }} />
            <div className="colors">
                {miniColorBoxes}
            </div>
            <h5 className="title">{paletteName} <span className="emoji">{emoji}</span></h5>
        </div>
    )
}
