import React from 'react';

export default function StarHalfFull(props) {
    return (
        <span
            style={{
                color: `${props.Color}`,
                fontSize: `${props.Size}`,
                // textShadow: '1px 1px 0 #db9a00',
            }}
        >
            {Array.from({ length: 5 }, (_, i) => (
                <i key={i} className='fa-solid fa-star'
                    style={{
                        // position: 'relative',
                        height: '26px',
                        alignContent: 'center',
                        color: 'transparent',
                        background:
                            i + 1 <= props.Rating ?
                                '#ffd700'
                                : (
                                    i > props.Rating ? '#ccc'
                                        :
                                        `linear-gradient(to right, #ffd700 ${(props.Rating - i) * 100}%, #ccc ${(props.Rating - i) * 100}%)`
                                ),
                        webkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                    }}
                >
                </i>
            ))}
        </span >
    )
}
