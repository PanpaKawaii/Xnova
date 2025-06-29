import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PopupJoining.css';
import './Invitation.css';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading';

export default function PopupJoining({ invitation, closePopup }) {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const JoinInvitation = async () => {

        if (!user) {
            return;
        }

        const JoiningData = {
            id: 0,
            joinDate: new Date(),
            status: 1,
            userId: user?.id,
            invitationId: invitation.id,
        };
        console.log('JoiningData:', JoiningData);

        const token = user?.token;
        try {
            setLoading(true);
            const result = await postData('UserInvivation', JoiningData, token);
            console.log('result', result);
            setLoading(false);
            // closePopup(null);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleJoinInvitaion = () => {
        JoinInvitation();
    }

    return (
        <div className='row'>
            <div id='popupJoining' className='overlay'>
                <div className='col popup-joining'>
                    {loading ?
                        <Loading />
                        :
                        <React.Fragment>
                            <div className='currentdate-booked'>
                                <div className='currentdate'>{invitation.postingDate}</div>
                                {invitation.booked ?
                                    <Link to='/venue/1' className='booked'>
                                        <div>ĐÃ ĐẶT SÂN</div>
                                        <i className='fa-solid fa-angle-right'></i>
                                    </Link>
                                    :
                                    <Link className='not-booked'></Link>
                                }
                            </div>
                            <div className='user'>
                                <img src={invitation.user?.image} alt={invitation.user?.name}></img>
                                <div className='joined'>{invitation.availablePlayer + invitation.userInvitations?.length}/{invitation.totalPlayer}</div>
                                <div className='joining-cost'>{invitation.joiningCost?.toLocaleString('vi-VN')} VND</div>
                            </div>
                            <div className='name'>{invitation.user?.name}</div>
                            <div className='date'>{invitation.date || invitation.booking?.date}, <span>{invitation.startTime.substring(0, 5)} - {invitation.endTime.substring(0, 5)}</span></div>
                            <div className='location-distance'>
                                <i className='fa-solid fa-location-dot'></i>
                                <div className='location'>{invitation.location || invitation.booking?.field?.venue?.address}<div className='shadow'>...</div></div>
                                <div className='distance'>~9.9 Kms</div>
                            </div>
                            <div className='type'>
                                {invitation.kindOfSport || invitation.booking?.field?.type?.name}
                            </div>
                            <div className='footer-card'>
                                {(invitation.name || invitation.standard) ?
                                    <div className='note'>
                                        <div>Yêu cầu: {invitation.standard}</div>
                                        <div>{invitation.name}</div>
                                    </div>
                                    :
                                    <div className='note no-note'>Không có ghi chú</div>
                                }
                                <div className='btn-box'>
                                    <button
                                        id='btn-join'
                                        className='btn btn-join'
                                        onClick={handleJoinInvitaion}
                                        disabled={invitation.availablePlayer + invitation.userInvitations?.length >= invitation.totalPlayer}
                                    >
                                        XÁC NHẬN THAM GIA
                                    </button>
                                    <button
                                        id='btn-cancel'
                                        className='btn'
                                        onClick={() => closePopup(null)}
                                        disabled={invitation.availablePlayer + invitation.userInvitations?.length >= invitation.totalPlayer}
                                    >
                                        ĐÓNG
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}
