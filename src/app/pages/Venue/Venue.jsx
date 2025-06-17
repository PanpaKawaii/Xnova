import React from 'react';
import Select from 'react-select';
import StarRating from '../../components/StarRating.jsx';
import StarHalfFull from '../../components/StarHalfFull.jsx';
import VenueFeedback from './VenueFeedback.jsx';
import './Venue.css';

import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { types, venues, images, fields, slots, bookings } from '../../../mocks/XnovaDatabase.js';

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

    const [TYPEs, setTYPEs] = useState(types);
    const [VENUEs, setVENUEs] = useState(venues.filter(v => v.Status === 1));
    const [IMAGEs, setIMAGEs] = useState(images);
    const [FIELDs, setFIELDs] = useState(fields);
    const [SLOTs, setSLOTs] = useState(slots);
    const [BOOKINGs, setBOOKINGs] = useState(bookings);


    // Image
    console.log('venueWithImages');
    const venueWithImages = VENUEs.map(venue => {
        const venueImages = IMAGEs.filter(img => img.VenueId === venue.Id);
        return {
            ...venue,
            Images: venueImages
        };
    });

    // Type
    console.log('venuesWithTypes');
    const venuesWithTypes = venueWithImages.map(venue => {
        const venueFields = FIELDs.filter(field => field.VenueId === venue.Id);
        const typeIds = [...new Set(venueFields.map(f => f.TypeId))];
        const matchedTypes = TYPEs.filter(type => typeIds.includes(type.Id));
        const uniqueTypesByName = [];
        const nameSet = new Set();
        for (const type of matchedTypes) {
            if (!nameSet.has(type.Name)) {
                nameSet.add(type.Name);
                uniqueTypesByName.push(type);
            }
        }
        return {
            ...venue,
            Types: uniqueTypesByName
        };
    });

    //Rating
    console.log('venuesWithRating');
    const fieldIdToVenueId = {};
    fields.forEach(field => {
        fieldIdToVenueId[field.Id] = field.VenueId;
    });
    const venueRatings = {};
    BOOKINGs.forEach(booking => {
        const venueId = fieldIdToVenueId[booking.FieldId];
        if (venueId) {
            if (!venueRatings[venueId]) {
                venueRatings[venueId] = { total: 0, count: 0 };
            }
            venueRatings[venueId].total += booking.Rating;
            venueRatings[venueId].count += 1;
        }
    });
    const venuesWithRating = venuesWithTypes.map(venue => {
        const ratingData = venueRatings[venue.Id];
        const averageRating = ratingData ? ratingData.total / ratingData.count : null;
        return {
            ...venue,
            Rating: averageRating
        };
    });

    //Price
    // console.log('venuesWithPrice');
    const venuesWithPrice = venuesWithRating.map(venue => {
        const venueFields = fields.filter(field => field.VenueId === venue.Id);
        const fieldIds = venueFields.map(f => f.Id);
        const venueSlots = SLOTs.filter(slot => fieldIds.includes(slot.FieldId));
        const prices = venueSlots.map(slot => slot.Price);
        return {
            ...venue,
            Prices: prices
        };
    });
    console.log('venuesWithPrice', venuesWithPrice);

    const [selectedType, setSelectedType] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState({ value: 0, label: '' });
    const [selectedMaxPrice, setSelectedMaxPrice] = useState({ value: 0, label: '' });
    // const filteredVenues = selectedType
    //     ? venuesWithPrice.filter(venue =>
    //         venue.Types.some(type => type.Id === Number(selectedType))
    //     )
    //     : venuesWithPrice;

    // const filteredVenues = venuesWithPrice.filter(venue =>
    //     venue.Types.some(type => type.Id === Number(selectedType) || !selectedType)
    // );

    const filteredVenues = venuesWithPrice.filter(venue => {
        const matchType = !selectedType || venue.Types.some(type => type.Id === Number(selectedType));
        const matchPrice = (
            (!selectedMinPrice || venue.Prices?.some(p => p >= Number(selectedMinPrice.value))) &&
            (!selectedMaxPrice || venue.Prices?.some(p => p <= Number(selectedMaxPrice.value)))
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



    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                // const typeResponse = await fetch('https://localhost:7166/api/Type');
                // if (!typeResponse.ok) throw new Error('Network response was not ok');
                // const typeData = await typeResponse.json();
                // setTYPEs(typeData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                // const slotResponse = await fetch('https://localhost:7166/api/Slot');
                // if (!slotResponse.ok) throw new Error('Network response was not ok');
                // const slotData = await slotResponse.json();
                // setSLOTs(slotData);

                // const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                // if (!bookingResponse.ok) throw new Error('Network response was not ok');
                // const bookingData = await bookingResponse.json();
                // setBOOKINGs(bookingData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                            <option value=''>[TYPE]</option>
                            {TYPEs && TYPEs.map((type) => (
                                <option key={type.Id} value={type.Id}>
                                    {type.Name}
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

                    <button type='reset' className='btn' onClick={handleReset}>RESET</button>
                </form>
                {id ? <Link to={`../user/booking`}><button className='btn'>BOOKED FIELD</button></Link> : <></>}
            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle'>
                    <thead>
                        <tr>
                            <th className='text-middle'>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Contact</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan='2' className='text-middle index-td'>{index + 1}</td>
                                        <td className='image'>
                                            <img src={venue.Images[0]?.Link} alt={venue.Name} />
                                        </td>
                                        <td>
                                            {/* <div>ID: {venue.Id}</div> */}
                                            <div className='venue-name'>{venue.Name}</div>
                                            {(venue.Rating && venue.Rating) > 0 ? (
                                                <div className='half-star'>
                                                    <span className='rating-value'>{venue.Rating.toFixed(1)}</span>
                                                    <StarHalfFull Rating={venue.Rating} Size={'1.3em'} Color={'#ffd700'} />
                                                </div>
                                            ) : (
                                                <>
                                                    <StarRating Rating={5} Size={'1.3em'} Color={'#ffd700'} /> (Recommend)
                                                </>
                                            )}
                                            <div>
                                                {venue.Prices.length ? Math.min(...venue.Prices).toLocaleString('vi-VN') : null} - {venue.Prices.length ? Math.max(...venue.Prices).toLocaleString('vi-VN') : null} VND/slot
                                            </div>
                                            <button className='btn view-btn' onClick={() => handleVenueShowFeedback(venue.Id)}>View feedback</button>
                                        </td>
                                        <td className='text-middle'>
                                            <div>
                                                {venue.Types?.map(type => (
                                                    <div key={type.Id}>{type.Name}</div>
                                                ))}

                                            </div>
                                        </td>
                                        <td>
                                            <div>Phone: {venue.Contact}</div>
                                            <div>Address: {venue.Address}</div>
                                            <div>Longitude: {venue.Longitude} - Latitude: {venue.Latitude}</div>
                                        </td>
                                        <td>
                                            <Link to={`../../../venue/${venue.Id}`} state={{ venue }}>
                                                <button className='btn' >DETAIL</button>
                                            </Link>
                                        </td>
                                    </tr>
                                    {venue.Id === VenueShowFeedback ?
                                        <tr className={`box ${venue.Id === VenueShowFeedback ? 'display' : 'hidden'}`}>
                                            <td colSpan='4'>
                                                <VenueFeedback Venue={venue} Number={6} />
                                            </td>
                                            <td>
                                                <Link to={`../../../venue/${venue.Id}`} state={{ venue }}>
                                                    <button className='btn' >MORE</button>
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
