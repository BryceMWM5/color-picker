/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { useNavigate, Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function PaletteList(props) {
    const { palettes, removePalette } = props;

    const [state, setState] = useState({
        openDeleteDialog: false,
        targetId: ""
    });

    const { openDeleteDialog, targetId } = state;

    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate(`/palette/${name}`)
    };

    const handleRestore = () => {
        window.localStorage.clear();
        window.location.reload();
    }

    const openDialog = (id) => {
        setState({
            ...state, openDeleteDialog: true, targetId: id
        });
    }

    const closeDialog = () => {
        setState({
            ...state, openDeleteDialog: false, targetId: ""
        });
    }

    const handleDelete = () => {
        removePalette(targetId);
        closeDialog();
    }

    return (
        <div className="root" css={css`
            background-color: blue;
            height: 100vh;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            background-color: #ff9d00;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23FFDEBF' stroke-width='74.3' stroke-opacity='0.19' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23f29400' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23e58b00' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23d88200' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23cb7900' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23bf7000' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23b26700' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23a55e00' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23985500' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%238b4b01' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%237e4201' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23713901' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23643001' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23582701' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234b1e01' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e1501' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23310c01' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23240301' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
            background-attachment: fixed;
            background-size: cover;
            /* background by SVGBackgrounds.com */
            overflow: scroll;

            .fade-exit {
                opacity: 1;
            }
            .fade-exit-active {
                opacity: 0;
                transition: opacity 500ms ease-out;
            }
            .header {
                font-size: 2rem;
            }
            .container {
                width: 50%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                flex-wrap: wrap;
            }
            .container-buttons {
                width: 50%;
                display: flex;
                align-items: flex-end;
                justify-content: space-around;
            }
            .nav {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
                color: white;
                & a{
                    text-decoration: none;
                    color: white;
                }
            }
            .palettes {
                box-sizing: border-box;
                width: 100%;
                display: grid;
                grid-template-columns: repeat(3, 30%);
                grid-gap: 2rem;
            }

            @media (max-width: 1600px) {
                .container {
                    width: 80%;
                }
            }

            @media (max-width: 1199.98px) {

            }

            @media (max-width: 991.98px) {
                .palettes {
                    grid-template-columns: repeat(2, 50%)
                }
                .container-buttons a,
                .container-buttons button {
                    padding: 5px 5px;
                }
            }

            @media (max-width: 767.98px) {
                
            }

            @media (max-width: 575.98px) {
                .container {
                    width: 75%;
                }
                .palettes {
                    grid-template-columns: repeat(1, 100%);
                    grid-gap: 1.5rem;
                }
            }
        `}>
            <div className="container">
                <nav className="nav">
                    <h1 className="header">React Colors</h1>
                    <div className="container-buttons">
                        <Button component={Link} to="/palette/new" variant="contained" color="primary">Create a Palette</Button>
                        <Button onClick={() => handleRestore()} variant="contained" color="secondary">Restore Default Palettes</Button>
                    </div>
                </nav>
                <TransitionGroup className="palettes">
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette
                                key={palette.id}
                                id={palette.id}
                                handleClick={handleClick}
                                openDialog={openDialog}
                                {...palette}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog onClose={closeDialog} open={openDeleteDialog} aria-labelledby="delete-dialog-title">
                <DialogTitle id="delete-dialog-title">
                    Delete this Palette?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Nevermind</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default PaletteList;