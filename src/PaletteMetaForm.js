/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


export default function PaletteMetaForm(props) {

    const [state, setState] = useState({
        stage: 'paletteName', newPaletteName: ''
    });

    const { newPaletteName, stage } = state;

    const { savePalette, handleClickClose } = props;

    const handleNameChange = (evt) => {
        setState({
            ...state, [evt.target.name]: evt.target.value
        });
    };

    const showEmojiPicker = () => {
        setState({
            ...state, stage: 'emoji'
        });
    };

    const createPalette = (emoji) => {
        const newPalette = {
            paletteName: newPaletteName,
            emoji: emoji.native
        };
        savePalette(newPalette);
    }

    return (
        <div className='root' css={css`
            .paletteNameInput {
                width: 100%;
                border: none;
            }

            .saveButton {
                width: 100%;
            }
        `}>
            <Dialog open={stage === 'emoji'} onClose={handleClickClose}>
                <DialogTitle>Pick an Emoji!</DialogTitle>
                <Picker data={data} onEmojiSelect={createPalette} />
            </Dialog>
            <Dialog open={stage === 'paletteName'} onClose={handleClickClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Choose a unique name for your palette.
                        </DialogContentText>
                        <TextValidator
                            fullWidth
                            margin='normal'
                            label="Palette Name"
                            name='newPaletteName'
                            value={newPaletteName}
                            onChange={handleNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Palette Name Required", "Palette Name Already Taken"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose}>Cancel</Button>
                        <Button type='submit' variant="contained" color="primary" >Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );

};

