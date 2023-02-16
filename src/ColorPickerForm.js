/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function ColorPickerForm(props) {

    const { paletteFull, addNewColor, colors, changeColor, currentColor } = props;

    const [state, setState] = useState({
        newColorName: ''
    });

    const { newColorName } = state;

    useEffect(() => {
        ValidatorForm.addValidationRule('isNameUnique', value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    });

    const handleNameChange = (evt) => {
        setState({
            ...state, [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = () => {
        const newColor = { color: currentColor, name: newColorName };
        addNewColor(newColor);
        setState({
            ...state, newColorName: ''
        })
    };

    return (
        <div className='root' css={css`
            width:100%;

            .picker {
                width: 100% !important;
                margin-top: 2rem;
            }

            .addColor {
                width: 100%;
                padding: 1rem;
                margin-top: 1rem;
                font-size: 2rem;
            }

            .colorNameInput {
                width: 100%;
            }
        `}>
            <ChromePicker disableAlpha color={currentColor} onChange={changeColor} className='picker' />
            <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                <TextValidator
                    autoFocus
                    placeholder='Color Name'
                    margin='normal'
                    className='colorNameInput'
                    value={newColorName}
                    name="newColorName"
                    onChange={handleNameChange}
                    validators={["required", "isNameUnique", "isColorUnique"]}
                    errorMessages={["This Field is Required", "Color Name Must Be Unique", "Color Must Be Unique"]}
                />
                <Button disabled={paletteFull}
                    className="addColor"
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: paletteFull ? 'grey' : currentColor }}
                    color="success">{paletteFull ? "Palette Full" : "Add Color"}</Button>
            </ValidatorForm>
        </div>
    )
}