import React from 'react';
import './SoccerBall.css';

export default function SoccerBall() {

    const Distance = 144;
    const SubDistance = -5.02;
    const Angle = -116.565;

    const DistanceWhite = 141;
    const AngleWhite1 = 37.5;
    const AngleWhite2 = 42;

    return (
        <>
            <div className='scene-ball'>
                <div className='ball'>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className={`face f${index + 1}`}
                            style={{
                                background: `#333333`,
                                transform: `
                                rotateZ(${index === 6 ? 180 : index * 72}deg)
                                rotateX(${(index !== 0 && index !== 6) ? (index < 6 ? Angle : 180 + Angle) : 0}deg)
                                rotateY(${index === 0 ? 0 : 180}deg)
                                translateY(${SubDistance}px)
                                translateZ(${Distance}px)
                                `,
                            }}
                        >
                            {/* Face{index + 1} */}
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`tri f${index + 1}`}
                                    style={{
                                        background: `#28a74540`,
                                        transform: `
                                        translateY(${5}px)
                                        rotateZ(${index % 5 * 72}deg)
                                        `,
                                        hover: {
                                            transform: `
                                            translateY(${10}px)
                                            `
                                        }
                                    }}
                                >
                                    Face{index + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                    {[...Array(20)].map((_, index) => (
                        <div
                            key={index}
                            className={`face face-white f${index + 13}`}
                            style={{
                                background: `#aaa`,
                                transform: `
                                rotateZ(${(index % 5) * 72 + 36}deg)
                                rotateX(${index < 10 ? (index < 5 ? AngleWhite1 : AngleWhite1 + 180) : (index < 15 ? AngleWhite1 + AngleWhite2 : AngleWhite1 + AngleWhite2 + 180)}deg)
                                rotateY(${index < 10 ? 0 : 180}deg)
                                translateZ(${DistanceWhite}px)
                                `,
                            }}
                        >
                            Face{index + 13}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
