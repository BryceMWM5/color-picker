/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { css } from '@emotion/react';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div className="root" css={css`
            margin-left: 50px;

            a {
                text-decoration: underline;
                color: blue;
            } &:hover {
                cursor: pointer;
            }
        `}>
            <h1>Sorry, page not found :(</h1>
            <a onClick={() => navigate('/')}>Take Me Home</a>
        </div>

    )
}