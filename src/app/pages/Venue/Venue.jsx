import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { fetchData } from '../../../mocks/CallingAPI.js';
import StarHalfFull from '../../components/StarHalfFull.jsx';
import StarRating from '../../components/StarRating.jsx';
import './Venue.css';
import VenueFeedback from './VenueFeedback.jsx';

export default function Venue() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const { pathname } = useLocation();
    useEffect(() => {
        console.log('pathname:', pathname);
    }, [pathname]);

    const [TYPEs, setTYPEs] = useState([]);
    const [VENUEs, setVENUEs] = useState([]);
    const [IMAGEs, setIMAGEs] = useState([]);
    const [FIELDs, setFIELDs] = useState([]);
    const [SLOTs, setSLOTs] = useState([]);
    const [BOOKINGs, setBOOKINGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataAPI = async () => {
            try {
                const typeData = await fetchData('Type');
                console.log('typeData', typeData);
                setTYPEs(typeData);

                const venueData = await fetchData('Venue');
                console.log('venueData', venueData);
                setVENUEs(venueData.filter(s => s.status === 1));

                const imageData = await fetchData('Image');
                console.log('imageData', imageData);
                setIMAGEs(imageData.filter(s => s.status === 1));

                const fieldData = await fetchData('Field');
                console.log('fieldData', fieldData);
                setFIELDs(fieldData.filter(s => s.status === 1));

                const slotData = await fetchData('Slot');
                console.log('slotData', slotData);
                setSLOTs(slotData.filter(s => s.status === 1));

                const bookingData = await fetchData('Booking');
                console.log('bookingData', bookingData);
                setBOOKINGs(bookingData.filter(s => s.status === 1));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, []);

    // Image
    console.log('venueWithImages');
    const venueWithImages = VENUEs.map(venue => {
        const venueImages = IMAGEs.filter(img => img.venueId === venue.id);
        return {
            ...venue,
            images: venueImages
        };
    });

    // Type
    console.log('venuesWithTypes');
    const venuesWithTypes = venueWithImages.map(venue => {
        const venueFields = FIELDs.filter(field => field.venueId === venue.id);
        const typeIds = [...new Set(venueFields.map(f => f.typeId))];
        const matchedTypes = TYPEs.filter(type => typeIds.includes(type.id));
        const uniqueTypesByName = [];
        const nameSet = new Set();
        for (const type of matchedTypes) {
            if (!nameSet.has(type.name)) {
                nameSet.add(type.name);
                uniqueTypesByName.push(type);
            }
        }
        return {
            ...venue,
            types: uniqueTypesByName
        };
    });

    //Rating
    console.log('venuesWithRating');
    const fieldIdToVenueId = {};
    FIELDs.forEach(field => {
        fieldIdToVenueId[field.id] = field.venueId;
    });
    const venueRatings = {};
    BOOKINGs.forEach(booking => {
        const venueId = fieldIdToVenueId[booking.fieldId];
        if (venueId) {
            if (!venueRatings[venueId]) {
                venueRatings[venueId] = { total: 0, count: 0 };
            }
            venueRatings[venueId].total += booking.rating;
            venueRatings[venueId].count += 1;
        }
    });
    const venuesWithRating = venuesWithTypes.map(venue => {
        const ratingData = venueRatings[venue.id];
        const averageRating = ratingData ? ratingData.total / ratingData.count : null;
        return {
            ...venue,
            rating: averageRating
        };
    });

    //Price
    // console.log('venuesWithPrice');
    const venuesWithPrice = venuesWithRating.map(venue => {
        const venueFields = FIELDs.filter(field => field.venueId === venue.id);
        const fieldIds = venueFields.map(f => f.id);
        const venueSlots = SLOTs.filter(slot => fieldIds.includes(slot.fieldId));
        const prices = venueSlots.map(slot => slot.price);
        return {
            ...venue,
            prices: prices
        };
    });
    console.log('venuesWithPrice', venuesWithPrice);

    const [selectedType, setSelectedType] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState({ value: 0, label: '' });
    const [selectedMaxPrice, setSelectedMaxPrice] = useState({ value: 0, label: '' });
    // const filteredVenues = selectedType
    //     ? venuesWithPrice.filter(venue =>
    //         venue.types.some(type => type.id === Number(selectedType))
    //     )
    //     : venuesWithPrice;

    // const filteredVenues = venuesWithPrice.filter(venue =>
    //     venue.types.some(type => type.id === Number(selectedType) || !selectedType)
    // );

    const filteredVenues = venuesWithPrice.filter(venue => {
        const matchType = !selectedType || venue.types.some(type => type.id === Number(selectedType));
        const matchPrice = (
            (!selectedMinPrice || venue.prices?.some(p => p >= Number(selectedMinPrice.value))) &&
            (!selectedMaxPrice || venue.prices?.some(p => p <= Number(selectedMaxPrice.value)))
        );
        return matchType && matchPrice;
    });

    const [VenueShowFeedback, setVenueShowFeedback] = useState(null);
    const handleVenueShowFeedback = (VenueId) => {
        if (VenueId === VenueShowFeedback) {
            setVenueShowFeedback(null);
        } else {
            setVenueShowFeedback(VenueId);
        }
    }

    const handleChangeMin = (selectedOption) => {
        setSelectedMinPrice(selectedOption); // Cập nhật giá trị khi người dùng chọn một option
    };
    const handleChangeMax = (selectedOption) => {
        setSelectedMaxPrice(selectedOption); // Cập nhật giá trị khi người dùng chọn một option
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: 'lightblue',
        }),
        option: (base) => ({
            ...base,
            color: 'red',
        }),
    };

    // const filteredResults = filteredPods ? filteredPods.filter(pod =>
    //     (pod.storeId == StoreId.Id || !StoreId.Id) &&
    //     (pod.storeId == selectedStore || !selectedStore) &&
    //     (pod.typeId.toString() === selectedType.toString() || !selectedType.toString()) &&
    //     STOREs.filter(store => store.status === 'Đang hoạt động').some(store => store.id === pod.storeId)
    // ) : [];




    // // Lấy Utility được chọn
    // const filteredUtilities = UTILITIes ? UTILITIes.filter(utility =>
    //     utility.id.toString() === selectedUtility.toString() || !selectedUtility.toString()
    // ) : [];
    // // Lấy Pods của Utility được chọn
    // const Pods = (filteredUtilities && filteredUtilities.length > 0) ? filteredUtilities[0].pods : [];
    // // Lấy Pods có status là Đang hoạt động
    // const filteredPods = Pods ? Pods.filter(pod => pod.status === 'Đang hoạt động') : [];
    // //Lấy Pods trùng khớp với những lựa chọn trên thanh tìm kiếm
    // const filteredResults = filteredPods ? filteredPods.filter(pod =>
    //     (pod.storeId == StoreId.Id || !StoreId.Id) &&
    //     (pod.storeId == selectedStore || !selectedStore) &&
    //     (pod.typeId.toString() === selectedType.toString() || !selectedType.toString()) &&
    //     STOREs.filter(store => store.status === 'Đang hoạt động').some(store => store.id === pod.storeId)
    // ) : [];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleReset = () => {
        setSelectedType('');
        setSelectedMinPrice('');
        setSelectedMaxPrice('');
    };

    // if (loading) return (
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <span className='visually-hidden'>Loading...</span>
    //     </div>
    // );
    // if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='venue-container'>

            <div className='search'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group form-type'>
                        <select
                            className='form-control'
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value=''>--Môn thể thao--</option>
                            {TYPEs && TYPEs.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Select
                        isSearchable={false}
                        value={selectedMinPrice}
                        onChange={setSelectedMinPrice}
                        options={[
                            { value: 100000, label: '100.000 VND' },
                            { value: 200000, label: '200.000 VND' },
                            { value: 300000, label: '300.000 VND' },
                            { value: 400000, label: '400.000 VND' },
                            { value: 500000, label: '500.000 VND' },
                        ]}
                    />
                    {selectedMinPrice && <p>You selected min: {selectedMinPrice.label}</p>}

                    <Select
                        value={selectedMaxPrice}
                        onChange={setSelectedMaxPrice}
                        options={[
                            { value: 100000, label: '100.000 VND' },
                            { value: 200000, label: '200.000 VND' },
                            { value: 300000, label: '300.000 VND' },
                            { value: 400000, label: '400.000 VND' },
                            { value: 500000, label: '500.000 VND' },
                        ]}
                    />
                    {selectedMaxPrice && <p>You selected max: {selectedMaxPrice.label}</p>}

                    <button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</button>
                </form>
                {id ? <Link to={`../user/booking`}><button className='btn'>SÂN ĐÃ ĐẶT</button></Link> : <></>}
            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle'>
                    <thead>
                        <tr>
                            <th className='text-middle'>STT</th>
                            <th>Ảnh</th>
                            <th>Thông tin</th>
                            <th>Bộ môn</th>
                            <th>Liên hệ</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan='2' className='text-middle index-td'>{index + 1}</td>
                                        <td className='image'>
                                            <img src={venue.images[0]?.link} alt={venue.name} />
                                        </td>
                                        <td>
                                            {/* <div>ID: {venue.id}</div> */}
                                            <div className='venue-name'>{venue.name}</div>
                                            {(venue.rating && venue.rating) > 0 ? (
                                                <div className='half-star'>
                                                    <span className='rating-value'>{venue.rating.toFixed(1)}</span>
                                                    <StarHalfFull Rating={venue.rating} Size={'1.3em'} Color={'#ffd700'} />
                                                </div>
                                            ) : (
                                                <>
                                                    <StarRating Rating={5} Size={'1.3em'} Color={'#ffd700'} /> (Recommend)
                                                </>
                                            )}
                                            <div>
                                                {venue.prices.length ? Math.min(...venue.prices).toLocaleString('vi-VN') : null} - {venue.prices.length ? Math.max(...venue.prices).toLocaleString('vi-VN') : null} VND/slot
                                            </div>
                                            <button className='btn view-btn' onClick={() => handleVenueShowFeedback(venue.id)}>View feedback</button>
                                        </td>
                                        <td className='text-middle'>
                                            <div>
                                                {venue.types?.map(type => (
                                                    <div key={type.id}>{type.name}</div>
                                                ))}

                                            </div>
                                        </td>
                                        <td>
                                            <div>Phone: {venue.contact}</div>
                                            <div>Address: {venue.address}</div>
                                            <div>Longitude: {venue.longitude} - Latitude: {venue.latitude}</div>
                                        </td>
                                        <td>
                                            <Link to={`../../../venue/${venue.id}`} state={{ venue }}>
                                                <button className='btn' >DETAIL</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    {venue.id === VenueShowFeedback ?
                                        <tr className={`box ${venue.id === VenueShowFeedback ? 'display' : 'hidden'}`}>
                                            <td colSpan='4'>
                                                <VenueFeedback Venue={venue} Number={6} />
                                            </td>
                                            <td>
                                                <Link to={`../../../venue/${venue.id}`} state={{ venue }}>
                                                    <button className='btn' >XEM THÊM</button>
                                                </Link>
                                            </td>
                                        </tr>
                                        :
                                        <tr></tr>
                                    }
                                </React.Fragment>
                            ))
                        ) : (
                            <tr><td colSpan='6'>Không tìm thấy khu vực nào.</td></tr>
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    )
}
