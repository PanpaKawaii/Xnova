import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import BackArrow from '../../components/BackArrow.jsx';
import StarHalfFull from '../../components/StarHalfFull.jsx';
import StarRating from '../../components/StarRating.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import { fetchData } from '../../../mocks/CallingAPI.js';
import BookingForm from './BookingForm.jsx';
import './VenueDetail.css';
import VenueFeedback from './VenueFeedback.jsx';

export default function VenueDetail() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const VenueState = location.state?.venue;
    console.log('VenueState', VenueState);


    const [Venue, setVenue] = useState(VenueState);


    const [TYPEs, setTYPEs] = useState([]);
    const [VENUEs, setVENUEs] = useState([]);
    const [IMAGEs, setIMAGEs] = useState([]);
    const [FIELDs, setFIELDs] = useState([]);
    const [SLOTs, setSLOTs] = useState([]);
    const [BOOKINGs, setBOOKINGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const token = user?.token;
        const fetchDataAPI = async () => {
            try {
                const typeData = await fetchData('Type', token);
                setTYPEs(typeData);

                const venueData = await fetchData('Venue', token);
                setVENUEs(venueData.filter(s => s.status === 1));
                console.log('venueData', venueData.filter(s => s.status === 1));

                const imageData = await fetchData('Image', token);
                setIMAGEs(imageData.filter(s => s.status === 1));

                const fieldData = await fetchData('Field', token);
                setFIELDs(fieldData.filter(s => s.status === 1));

                const slotData = await fetchData('Slot', token);
                setSLOTs(slotData.filter(s => s.status === 1));

                const bookingData = await fetchData('Booking', token);
                setBOOKINGs(bookingData.filter(s => s.status === 1));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const VenueId = useParams();
    console.log('VenueId.id', VenueId);
    useEffect(() => {
        if (!VenueState) {
            console.log('VENUEs', VENUEs);
            const VenueParams = VENUEs ? VENUEs.find(obj => { return obj.id == VenueId.id }) : null;
            console.log('VenueParams', VenueParams);
            setVenue(p => VenueParams);
        }
    }, [VENUEs]);


    return (
        <div className='venuedetail-container'>
            <BackArrow />

            <div className='venuedetail-content'>
                {Venue ? (
                    <React.Fragment>
                        <div className='venue-name'>{Venue.name}</div>
                        <div className='images'>
                            <div className='image-1'>
                                <img src={Venue.images[0]?.link} alt={Venue.name}></img>
                            </div>
                            {Venue.images[1] && <div className='image-2'>
                                <div className='image-2-1'>
                                    <img src={Venue.images[1]?.link} alt={Venue.name}></img>
                                </div>
                                {Venue.images[2] && <div className='image-2-2'>
                                    <img src={Venue.images[2]?.link} alt={Venue.name}></img>
                                </div>}
                            </div>}
                        </div>

                        <div className='detail-container'>
                            <BookingForm Venue={Venue} />
                        </div>

                        <div className='big-rating'>
                            {(Venue.rating && Venue.rating > 0) ?
                                <>
                                    <div className='rating'>{Venue.rating.toFixed(1)}<i className='fa-solid fa-star'></i></div>
                                    <div className='text-1'>Được khách hàng yêu thích</div>
                                    <div className='text-2'>Một trong những sân thể thao được yêu thích nhất trên Xnova dựa trên điểm xếp hạng, đánh giá và độ tin cậy</div>
                                </>
                                :
                                <>
                                    <div className='rating'><i className='fa-solid fa-star'></i></div>
                                    <div className='text-1'>Được đề xuất bởi Xnova</div>
                                    <div className='text-2'>Một trong những sân thể thao được đề xuất bởi Xnova dựa trên điểm xếp hạng, đánh giá và độ tin cậy</div>
                                </>
                            }
                        </div>

                        <div className='venuefeedback-container'>
                            <div className='feedback-title'>Feedback:</div>
                            <VenueFeedback Venue={Venue} Number={100} />
                        </div>
                    </React.Fragment>
                ) : (
                    <span>Không tìm thấy sân nào.</span>
                )}
            </div>
        </div>
    )
}
