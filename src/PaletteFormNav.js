/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from "react-router-dom";
import PaletteMetaForm from './PaletteMetaForm';


const drawerWidth = 400;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function PaletteFormNav(props) {
    const { open, palettes, savePalette, handleDrawerOpen } = props;

    const [state, setState] = useState({
        formShowing: false
    });

    const navigate = useNavigate();

    const { formShowing } = state;

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const handleClickOpen = () => {
        setState({
            ...state, formShowing: true
        });
    };

    const handleClickClose = () => {
        setState({
            ...state, formShowing: false
        });
    };

    return (
        <div className='root' css={css`
            display: flex;

            .navButtons {
                margin-right: 1rem;
            }
            .button {
                margin: 0 0.5rem;
            }
            @media (max-width: 1199.98px) {}

            @media (max-width: 991.98px) {
                .navButtons {
                    margin-right: 0.5rem;
                }
            }

            @media (max-width: 767.98px) {
                .button {
                    margin: 0 0.2rem;
                    padding: 0.2rem;
                }
            }

            @media (max-width: 575.98px) {}
        `}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color='default'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className="navButtons">
                    <Button className='button' onClick={() => navigate('/')} variant="contained" color="secondary">Go Back</Button>
                    <Button className='button' variant="contained" onClick={handleClickOpen}>Save Palette</Button>
                </div>
            </AppBar>
            {formShowing && (<PaletteMetaForm handleClickClose={handleClickClose} savePalette={savePalette} palettes={palettes} />)}
        </div>
    )
}