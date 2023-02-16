/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import seedColors from "./seedColors";


const drawerWidth = 400;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        height: 'calc(100vh - 64px)',
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            height: 'calc(100vh - 64px)'
        })
    }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) {

    const { handleSavePalette, palettes } = props;

    const [state, setState] = useState({
        open: true,
        colors: seedColors[0].colors,
        currentColor: '#3ae456'
    })

    const { open, colors, currentColor } = state;

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setState({
            ...state, open: true
        });
    };

    const handleDrawerClose = () => {
        setState({
            ...state, open: false
        });
    };

    const addNewColor = (newColor) => {
        setState({
            ...state, colors: [...colors, newColor], newColorName: ''
        });
    };

    const changeColor = (newColor) => {
        setState({
            ...state, currentColor: newColor.hex
        });
    };

    const removeColor = (colorName) => {
        setState({
            ...state, colors: colors.filter(color => color.name !== colorName)
        });
    }

    const findColor = (color) => {
        setState({
            ...state, currentColor: color
        });
    }

    const savePalette = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = colors;
        handleSavePalette(newPalette);
        navigate('/');
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setState(({ colors }) => ({
            ...state, colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };

    const clearColors = () => {
        setState({
            ...state, colors: []
        });
    }

    const addRandomColor = () => {
        const allColors = palettes.map(p => p.colors).flat();
        const filteredArr = allColors.filter(color => !colors.includes(color));
        const randomColor = filteredArr[Math.floor(Math.random() * filteredArr.length)];
        setState({
            ...state, colors: [...state.colors, randomColor]
        })
    }

    const paletteFull = colors.length >= props.maxColors;

    return (
        <div className='root' css={css`
            .container {
                width: 90%;
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .buttons {
                width: 100%;
            }

            .btn {
                width: 50%;
            }
        `}>
            <Box sx={{ display: 'flex' }}>
                <PaletteFormNav open={open} palettes={palettes} savePalette={savePalette} handleDrawerOpen={handleDrawerOpen} />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <div className="container">
                        <Typography gutterBottom variant="h4">Design Your Palette</Typography>
                        <div className="buttons">
                            <Button className='btn' onClick={clearColors} variant="contained" color="primary">Clear Palette</Button>
                            <Button className='btn' disabled={paletteFull} onClick={addRandomColor} variant="contained" color="secondary">Random Color</Button>
                        </div>
                        <ColorPickerForm paletteFull={paletteFull} addNewColor={addNewColor} colors={colors} changeColor={changeColor} currentColor={currentColor} />
                    </div>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <DraggableColorList onSortEnd={onSortEnd} axis="xy" colors={colors} removeColor={removeColor} findColor={findColor} />
                </Main>
            </Box>
        </div>
    );
}

NewPaletteForm.defaultProps = {
    maxColors: 20
}