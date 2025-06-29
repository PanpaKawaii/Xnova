import React from 'react';

export default function StarHalfFull(props) {
    return (
        <div
            className='starhalffull-container'
            style={{
                // color: `${props.Color}`,
                // fontSize: `${props.Size}`,
                // textShadow: '1px 1px 0 #db9a00',
            }}
        >
            {/* {Array.from({ length: 5 }, (_, i) => (
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
            ))} */}

            <div className='stars'
                style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                }}>

                {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width='100' viewBox='0 0 940.688 940.688'
                        style={{
                            width: '18px',
                            fill: '#ffd700',
                        }}>
                        <path d='M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z' />
                    </svg>
                ))}

                <div style={{
                    width: `${100 - props.Rating * 20}%`,
                    background: '#fff',
                    height: '100%',
                    overflow: 'hidden',
                    mixBlendMode: 'color',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}>
                </div>

            </div>
        </div >
    )
}
