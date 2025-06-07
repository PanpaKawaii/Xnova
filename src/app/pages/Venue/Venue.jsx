import React from 'react';
import './Venue.css';

import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

import { types, venues, images, fields, bookings, slots } from '../../../mocks/XnovaDatabase.js';

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
    const [BOOKINGs, setBOOKINGs] = useState(bookings);
    const [SLOTs, setSLOTs] = useState(slots);


    const venuesWithRating = useMemo(() => {

        const venueWithImages = VENUEs.map(venue => {
            console.log('venueWithImages');
            const venueImages = IMAGEs.filter(img => img.VenueId === venue.Id);
            return {
                ...venue,
                images: venueImages
            };
        });

        const venuesWithTypes = venueWithImages.map(venue => {
            console.log('venuesWithTypes');
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

        const fieldIdToVenueId = {};
        fields.forEach(field => {
            fieldIdToVenueId[field.Id] = field.VenueId;
        });
        const venueRatings = {};
        bookings.forEach(booking => {
            const venueId = fieldIdToVenueId[booking.FieldId];
            if (venueId) {
                if (!venueRatings[venueId]) {
                    venueRatings[venueId] = { total: 0, count: 0 };
                }
                venueRatings[venueId].total += booking.Rating;
                venueRatings[venueId].count += 1;
            }
        });

        return venuesWithTypes.map(venue => {
            console.log('venuesWithRating');
            const data = venueRatings[venue.Id];
            const rating = data ? data.total / data.count : null;
            return {
                ...venue,
                Rating: rating
            };
        });
    }, []);

    const [selectedType, setSelectedType] = useState('');
    const filteredVenues = selectedType
        ? venuesWithRating.filter(venue =>
            venue.Types.some(type => type.Id === Number(selectedType))
        )
        : venuesWithRating;





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
    };

    const getSlotPrice = (podId) => {
        const slot = SLOTs ? SLOTs.find(slot => slot.podId === podId) : null;
        return slot ? slot.price : null;
    };


    // if (loading) return (
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <span className='visually-hidden'>Loading...</span>
    //     </div>
    // );
    // if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='venue-container'>

            <div className='search-container'>
                <form className='search' onSubmit={handleSubmit}>
                    <div className='form-group'>
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
                    <button type='reset' className='btn' onClick={handleReset}>RESET</button>
                </form>
                {id ? <Link to={`../user/booking`}><button className='btn'>BOOKED FIELD</button></Link> : <></>}
            </div>

            <div className='booking-pod-container'>

                <table className='no-wrap align-middle'>
                    <thead className='list-header'>
                        <tr>
                            <th className='text-middle'>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Contact</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody className='list-body'>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map((venue, index) => (
                                <tr key={index} className='list-item'>
                                    <td className='text-middle'>{index + 1}</td>
                                    <td className='image-full'>
                                        <img src={venue.images[0]?.Link} alt={venue.Name} />
                                    </td>
                                    <td>
                                        {/* <div>ID: {venue.Id}</div> */}
                                        <div>{venue.Name}</div>
                                        {venue.Rating && venue.Rating > 0 ? (
                                            <span style={{ color: 'gold', fontSize: '1.3em' }}>
                                                {venue.Rating.toFixed(1)} <i className='fa-solid fa-star'></i>
                                            </span>
                                        ) : (
                                            <>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}>
                                                        <i className='fa-solid fa-star'></i>
                                                    </span>
                                                ))}
                                                <span>(Recomment)</span>
                                            </>
                                        )}

                                        <div>{getSlotPrice(venue.Id)?.toLocaleString('vi-VN')}đ/slot</div>
                                    </td>
                                    <td className='text-middle'>
                                        {venue.Types?.map(type => (
                                            <div key={type.Id}>{type.Name}</div>
                                        ))}
                                    </td>
                                    <td>
                                        <div>{venue.Contact}</div>
                                        <div>{venue.Address}</div>
                                    </td>
                                    <td>
                                        <Link to={`../../../venue/${venue.Id}`}>
                                            <button className='btn' >DETAIL</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan='7'>No venues found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div >
        </div >
    )
}
