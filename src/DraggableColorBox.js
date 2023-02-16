/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from '@emotion/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import { SortableElement } from 'react-sortable-hoc';
import chroma from 'chroma-js';



const DraggableColorBox = SortableElement((props) => {

    const { color, name, removeColor, findColor } = props;


    const contrast = chroma.contrast(color, 'black') < 6;

    return (
        <div className="root"
            css={css`
            width: 20%;
            height: 25%;
            margin: 0 auto;
            display: inline-block;
            position: relative;
            margin-bottom: -6px;
            cursor: pointer;
            @media (max-width: 1199.98px) {
                width: 25%;
                height: 20%;
            }

            @media (max-width: 991.98px) {
                width: 50%;
                height: 10%;
            }

            @media (max-width: 767.98px) {
                width: 100%;
                height: 5%;
            }

            @media (max-width: 575.98px) {}
            
            .boxContent {
                position: absolute;
                width: 100%;
                padding: 10px;
                left: 0px;
                bottom: 0px;
                color: black;
                letter-spacing: 1px;
                text-transform: uppercase;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
            }


            .deleteIcon,
            .searchIcon {
                color: rgba(0,0,0,0.5);
                transition: all 0.25s ease-in-out;
                &:hover{
                    color: white;
                    transform: scale(1.25);
                }
            }

            .white-color {
                color: rgba(255,255,255,0.8);
            }
        `}
            style={{ backgroundColor: color }}>
            <div className="boxContent">
                <span className={contrast ? 'white-color' : ''}>{name}</span>
                <SearchIcon className={contrast ? 'searchIcon white-color' : 'searchIcon'} onClick={findColor} />
                <DeleteForeverIcon className={contrast ? 'deleteIcon white-color' : 'deleteIcon'} onPointerDown={removeColor} />
            </div>
        </div>
    )
})

export default DraggableColorBox;