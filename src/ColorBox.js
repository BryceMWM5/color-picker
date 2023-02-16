import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

function ColorBox(props) {
    const { name, background, color, showLink } = props;

    const goToMore = evt => {
        evt.stopPropagation();
    }

    const [state, setState] = useState({
        copied: false
    });

    const handleCopy = () => {
        setState({ copied: true });
        setTimeout(() => setState({ copied: false }), 1200);
    }

    const { copied } = state;

    const contrast = chroma.contrast(background, 'black') < 6;

    return (
        <div style={{ background }} className='ColorBox'>
            <CopyToClipboard text={background} onCopy={handleCopy}>
                <div>
                    <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <p className={contrast ? 'white-color' : ''}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={contrast ? 'white-color' : ''}>{name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    {showLink && (
                        <Link to={`${color}`} onClick={goToMore}>
                            <span className={contrast ? 'see-more white-color' : 'see-more'} >More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        </div>
    );
}

export default ColorBox;