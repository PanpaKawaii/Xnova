export const types = [
    { Id: 1, Name: 'Football' },
    { Id: 2, Name: 'Badminton' },
    { Id: 3, Name: 'Pickleball' },
];

export const users = [
    { Id: 1, Name: 'Đặng Ngọc Hải Triều', Email: 'dangngochaitrieu@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Admin', Description: 'abc', PhoneNumber: '0123456789', Point: 0, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 2, Name: 'Nguyễn Gia Huy', Email: 'nguyengiahuy@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Owner', Description: 'abc', PhoneNumber: '0123456789', Point: 100000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 3, Name: 'Nguyễn Gia Hoàng', Email: 'nguyengiahoang@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Owner', Description: 'abc', PhoneNumber: '0123456789', Point: 200000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 4, Name: 'Phạm Thành Danh', Email: 'phamthanhdanh@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Owner', Description: 'abc', PhoneNumber: '0123456789', Point: 300000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 5, Name: 'Nguyễn Thành Dương', Email: 'nguyenthanhduong@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Customer', Description: 'abc', PhoneNumber: '0123456789', Point: 1000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 6, Name: 'Lê Hữu Thành Tín', Email: 'lehuuthanhtin@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Customer', Description: 'abc', PhoneNumber: '0123456789', Point: 2000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 7, Name: 'Trương Kim Hằng', Email: 'truongkimhang@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Customer', Description: 'abc', PhoneNumber: '0123456789', Point: 3000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
    { Id: 8, Name: 'Lê Minh Khoa', Email: 'leminhkhoa@gmail.com', Password: '123456', Image: 'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', Role: 'Customer', Description: 'abc', PhoneNumber: '0123456789', Point: 4000, Type: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1 },
];

export const venues = [
    { Id: 1, Name: 'Sunrise Sports Arena', Address: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 2 }, // Huy
    { Id: 2, Name: 'Green Field Center', Address: '456 Đường Nguyễn Văn Cừ, Quận 5, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 3 }, // Hoang
    { Id: 3, Name: 'Victory Stadium', Address: '789 Đường Trần Hưng Đạo, Quận 1, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 3 }, // Hoang
    { Id: 4, Name: 'Cityside Court', Address: '12 Đường Lê Văn Sỹ, Quận 3, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 4 }, // Danh
    { Id: 5, Name: 'The Arena Zone', Address: '34 Đường Phan Xích Long, Phú Nhuận, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 4 }, // Danh
    { Id: 6, Name: 'Mega Sports Hub', Address: '89 Đường Cộng Hòa, Tân Bình, TP. HCM', Longitude: '0', Latitude: '0', Contact: '0123456789', Status: 1, UserId: 4 }, // Danh
];

export const images = [
    { Id: 1, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 1 }, // Huy
    { Id: 2, Name: 'Field 2', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 1 },
    { Id: 3, Name: 'Field 3', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 1 },
    { Id: 4, Name: 'Field 4', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 1 },
    { Id: 5, Name: 'Field 5', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 1 },

    { Id: 6, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 2 }, // Hoang
    { Id: 7, Name: 'Field 2', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 2 },
    { Id: 8, Name: 'Field 3', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 2 },

    { Id: 9, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },
    { Id: 10, Name: 'Field 2', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },
    { Id: 11, Name: 'Field 3', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },
    { Id: 12, Name: 'Field 4', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },
    { Id: 13, Name: 'Field 5', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },
    { Id: 14, Name: 'Field 6', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 3 },

    { Id: 15, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 4 }, // Danh

    { Id: 16, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 5 },
    { Id: 17, Name: 'Field 2', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 5 },
    { Id: 18, Name: 'Field 3', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 5 },
    { Id: 19, Name: 'Field 4', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 5 },

    { Id: 20, Name: 'Field 1', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 6 },
    { Id: 21, Name: 'Field 2', Link: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', Status: 1, VenueId: 6 },
];

export const fields = [
    { Id: 1, Name: 'Football Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 1 }, // Huy
    { Id: 2, Name: 'Football Field 2', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 1 },
    { Id: 3, Name: 'Football Field 3', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 1 },
    { Id: 4, Name: 'Football Field 4', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 1 },
    { Id: 5, Name: 'Football Field 5', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 1 },

    { Id: 6, Name: 'Pickleball Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 3, VenueId: 2 }, // Hoang
    { Id: 7, Name: 'Pickleball Field 2', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 3, VenueId: 2 },
    { Id: 8, Name: 'Pickleball Field 3', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 3, VenueId: 2 },

    { Id: 9, Name: 'Badminton Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },
    { Id: 10, Name: 'Badminton Field 2', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },
    { Id: 11, Name: 'Badminton Field 3', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },
    { Id: 12, Name: 'Badminton Field 4', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },
    { Id: 13, Name: 'Badminton Field 5', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },
    { Id: 14, Name: 'Badminton Field 6', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 3 },

    { Id: 15, Name: 'Pickleball Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 3, VenueId: 4 }, // Danh

    { Id: 16, Name: 'Football Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 5 },
    { Id: 17, Name: 'Football Field 2', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 5 },
    { Id: 18, Name: 'Football Field 3', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 5 },
    { Id: 19, Name: 'Football Field 4', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 1, VenueId: 5 },

    { Id: 20, Name: 'Badminton Field 1', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 6 },
    { Id: 21, Name: 'Badminton Field 2', Description: 'aaaaaaaaaaaaaaaaaaaaaaa', Status: 1, TypeId: 2, VenueId: 6 },
];

export const favoriteFields = [
    { Id: 1, SetDate: '2025-06-04 14:30:00', UserId: 5, FieldId: 16 },
    { Id: 2, SetDate: '2025-06-04 14:30:00', UserId: 5, FieldId: 8 },
    { Id: 3, SetDate: '2025-06-04 14:30:00', UserId: 5, FieldId: 20 },
    { Id: 4, SetDate: '2025-06-04 14:30:00', UserId: 6, FieldId: 16 },
    { Id: 5, SetDate: '2025-06-04 14:30:00', UserId: 6, FieldId: 15 },
    { Id: 6, SetDate: '2025-06-04 14:30:00', UserId: 7, FieldId: 9 },
];

export const slots = [
    { Id: 1, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 1 },
    { Id: 2, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 2 },
    { Id: 3, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 3 },
    { Id: 4, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 4 },
    { Id: 5, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 5 },
    { Id: 6, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 6 },
    { Id: 7, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 7 },
    { Id: 8, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 8 },
    { Id: 9, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 9 },
    { Id: 10, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 10 },
    { Id: 11, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 11 },
    { Id: 12, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 12 },
    { Id: 13, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 13 },
    { Id: 14, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 14 },
    { Id: 15, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 15 },
    { Id: 16, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 16 },
    { Id: 17, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 17 },
    { Id: 18, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 18 },
    { Id: 19, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 19 },
    { Id: 20, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 20 },
    { Id: 21, Name: 'Slot 1', StartTime: '07:00:00', EndTime: '09:00:00', Price: 80000, Status: 1, FieldId: 21 },
    { Id: 22, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 1 },
    { Id: 23, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 2 },
    { Id: 24, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 3 },
    { Id: 25, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 4 },
    { Id: 26, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 5 },
    { Id: 27, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 6 },
    { Id: 28, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 7 },
    { Id: 29, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 8 },
    { Id: 30, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 9 },
    { Id: 31, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 10 },
    { Id: 32, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 11 },
    { Id: 33, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 12 },
    { Id: 34, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 13 },
    { Id: 35, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 14 },
    { Id: 36, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 15 },
    { Id: 37, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 16 },
    { Id: 38, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 17 },
    { Id: 39, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 18 },
    { Id: 40, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 19 },
    { Id: 41, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 20 },
    { Id: 42, Name: 'Slot 2', StartTime: '09:30:00', EndTime: '11:30:00', Price: 100000, Status: 1, FieldId: 21 },
    { Id: 43, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 1 },
    { Id: 44, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 2 },
    { Id: 45, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 3 },
    { Id: 46, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 4 },
    { Id: 47, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 5 },
    { Id: 48, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 6 },
    { Id: 49, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 7 },
    { Id: 50, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 8 },
    { Id: 51, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 9 },
    { Id: 52, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 10 },
    { Id: 53, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 11 },
    { Id: 54, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 12 },
    { Id: 55, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 13 },
    { Id: 56, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 14 },
    { Id: 57, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 15 },
    { Id: 58, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 16 },
    { Id: 59, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 17 },
    { Id: 60, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 18 },
    { Id: 61, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 19 },
    { Id: 62, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 20 },
    { Id: 63, Name: 'Slot 3', StartTime: '12:00:00', EndTime: '14:00:00', Price: 120000, Status: 1, FieldId: 21 },
    { Id: 64, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 1 },
    { Id: 65, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 2 },
    { Id: 66, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 3 },
    { Id: 67, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 4 },
    { Id: 68, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 5 },
    { Id: 69, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 6 },
    { Id: 70, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 7 },
    { Id: 71, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 8 },
    { Id: 72, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 9 },
    { Id: 73, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 10 },
    { Id: 74, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 11 },
    { Id: 75, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 12 },
    { Id: 76, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 13 },
    { Id: 77, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 14 },
    { Id: 78, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 15 },
    { Id: 79, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 16 },
    { Id: 80, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 17 },
    { Id: 81, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 18 },
    { Id: 82, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 19 },
    { Id: 83, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 20 },
    { Id: 84, Name: 'Slot 4', StartTime: '14:30:00', EndTime: '16:30:00', Price: 140000, Status: 1, FieldId: 21 },
    { Id: 85, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 1 },
    { Id: 86, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 2 },
    { Id: 87, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 3 },
    { Id: 88, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 4 },
    { Id: 89, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 5 },
    { Id: 90, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 6 },
    { Id: 91, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 7 },
    { Id: 92, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 8 },
    { Id: 93, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 9 },
    { Id: 94, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 10 },
    { Id: 95, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 11 },
    { Id: 96, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 12 },
    { Id: 97, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 13 },
    { Id: 98, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 14 },
    { Id: 99, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 15 },
    { Id: 100, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 16 },
    { Id: 101, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 17 },
    { Id: 102, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 18 },
    { Id: 103, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 19 },
    { Id: 104, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 20 },
    { Id: 105, Name: 'Slot 5', StartTime: '17:00:00', EndTime: '19:00:00', Price: 160000, Status: 1, FieldId: 21 },
    { Id: 106, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 1 },
    { Id: 107, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 2 },
    { Id: 108, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 3 },
    { Id: 109, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 4 },
    { Id: 110, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 5 },
    { Id: 111, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 6 },
    { Id: 112, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 7 },
    { Id: 113, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 8 },
    { Id: 114, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 9 },
    { Id: 115, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 10 },
    { Id: 116, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 11 },
    { Id: 117, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 12 },
    { Id: 118, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 13 },
    { Id: 119, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 14 },
    { Id: 120, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 15 },
    { Id: 121, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 16 },
    { Id: 122, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 17 },
    { Id: 123, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 18 },
    { Id: 124, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 19 },
    { Id: 125, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 20 },
    { Id: 126, Name: 'Slot 6', StartTime: '19:30:00', EndTime: '21:30:00', Price: 160000, Status: 1, FieldId: 21 },
];

export const bookings = [
    { Id: 1, Date: '2025-06-04', Rating: 5, Feedback: 'Perfect!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 5, FieldId: 16 },
    { Id: 2, Date: '2025-06-04', Rating: 4, Feedback: 'Good!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 5, FieldId: 8 },
    { Id: 3, Date: '2025-06-04', Rating: 5, Feedback: 'Good!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 5, FieldId: 20 },
    { Id: 4, Date: '2025-06-04', Rating: 5, Feedback: 'Ok!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 6, FieldId: 15 },
    { Id: 5, Date: '2025-06-04', Rating: 5, Feedback: 'Good!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 7, FieldId: 9 },
    { Id: 6, Date: '2025-06-04', Rating: 1, Feedback: 'Very bad!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 7, FieldId: 21 },
    { Id: 7, Date: '2025-06-04', Rating: 3, Feedback: 'Good!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 8, FieldId: 8 },
    { Id: 8, Date: '2025-06-04', Rating: 2, Feedback: 'Bad!', CurrentDate: '2025-06-04 14:30:00', Status: 1, UserId: 8, FieldId: 21 },
];

export const bookingSlots = [
    { Id: 1, BookingId: 1, SlotId: 37 },
    { Id: 2, BookingId: 2, SlotId: 71 },
    { Id: 3, BookingId: 2, SlotId: 92 },
    { Id: 4, BookingId: 3, SlotId: 41 },
    { Id: 5, BookingId: 3, SlotId: 62 },
    { Id: 6, BookingId: 3, SlotId: 83 },
    { Id: 7, BookingId: 3, SlotId: 104 },
    { Id: 8, BookingId: 4, SlotId: 15 },
    { Id: 9, BookingId: 4, SlotId: 36 },
    { Id: 10, BookingId: 4, SlotId: 57 },
    { Id: 11, BookingId: 5, SlotId: 93 },
    { Id: 12, BookingId: 6, SlotId: 84 },
    { Id: 13, BookingId: 7, SlotId: 113 },
    { Id: 14, BookingId: 8, SlotId: 105 },
    { Id: 15, BookingId: 8, SlotId: 126 },
];

export const payments = [
    { Id: 1, Method: 'VNPay', Amount: 100000, Note: 'Pay with VNPay method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 1 },
    { Id: 2, Method: 'VNPay', Amount: 300000, Note: 'Pay with VNPay method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 2 },
    { Id: 3, Method: 'VNPay', Amount: 520000, Note: 'Pay with VNPay method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 3 },
    { Id: 4, Method: 'Momo', Amount: 300000, Note: 'Pay with Momo method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 4 },
    { Id: 5, Method: 'Momo', Amount: 160000, Note: 'Pay with Momo method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 5 },
    { Id: 6, Method: 'Momo', Amount: 140000, Note: 'Pay with Momo method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 6 },
    { Id: 7, Method: 'VNPay', Amount: 160000, Note: 'Pay with VNPay method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 7 },
    { Id: 8, Method: 'VNPay', Amount: 320000, Note: 'Pay with VNPay method', Date: '2025-06-04 14:30:00', Status: 1, BookingId: 8 },
];

export const chatboxes = [
    { Id: 1, Name: 'Supercalifragilisticexpialidocious AI', Status: 1, UserId: 1 },
    { Id: 2, Name: 'My Amazing AI', Status: 1, UserId: 5 },
    { Id: 3, Name: 'Good job AI', Status: 1, UserId: 6 },
    { Id: 4, Name: 'Kawaii AI', Status: 1, UserId: 7 },
    { Id: 5, Name: 'AI Support', Status: 1, UserId: 8 },
];

export const messages = [
    { Id: 1, Content: 'What is supercalifragilisticexpialidocious?', Date: '2025-06-04 14:30:00', Status: 1, ChatboxId: 1 },
    { Id: 2, Content: 'Hello, my name is Duong!', Date: '2025-06-04 14:30:00', Status: 1, ChatboxId: 2 },
    { Id: 3, Content: 'Hello, my name is Tin!', Date: '2025-06-04 14:30:00', Status: 1, ChatboxId: 3 },
    { Id: 4, Content: 'Hello, my name is Hang!', Date: '2025-06-04 14:30:00', Status: 1, ChatboxId: 4 },
    { Id: 5, Content: 'Hello, my name is Khoa!', Date: '2025-06-04 14:30:00', Status: 1, ChatboxId: 5 },
];

export const saveFields = [
    { Id: 1, SetDate: '2025-06-04 14:30:00', UserId: 5, FieldId: 16 },
    { Id: 2, SetDate: '2025-06-04 14:30:00', UserId: 5, FieldId: 20 },
    { Id: 3, SetDate: '2025-06-04 14:30:00', UserId: 6, FieldId: 14 },
    { Id: 4, SetDate: '2025-06-04 14:30:00', UserId: 7, FieldId: 9 },
    { Id: 5, SetDate: '2025-06-04 14:30:00', UserId: 7, FieldId: 10 },
    { Id: 6, SetDate: '2025-06-04 14:30:00', UserId: 7, FieldId: 11 },
];

export const relationships = [
    { Id: 1, Name: 'Friend' },
    { Id: 2, Name: 'Best Friend' },
    { Id: 3, Name: 'Teammate' },
    { Id: 4, Name: 'Lover' },
    { Id: 5, Name: 'Important' },
    { Id: 6, Name: 'Other' },
];

export const friends = [
    { Id: 1, FriendId: 2, UserId: 3, RelationshipId: 5 },
    { Id: 2, FriendId: 4, UserId: 5, RelationshipId: 3 },
    { Id: 3, FriendId: 4, UserId: 6, RelationshipId: 3 },
    { Id: 4, FriendId: 5, UserId: 6, RelationshipId: 3 },
    { Id: 5, FriendId: 7, UserId: 8, RelationshipId: 2 },
];

export const vouchers = [
    { Id: 1, Name: 'Phiếu giảm giá 5%', Type: 'Percent', Amount: 5, MinEffect: 10000, MaxEffect: 5000, Status: 1 },
    { Id: 2, Name: 'Phiếu giảm giá 10%', Type: 'Percent', Amount: 10, MinEffect: 20000, MaxEffect: 10000, Status: 1 },
    { Id: 3, Name: 'Phiếu giảm giá 15%', Type: 'Percent', Amount: 15, MinEffect: 30000, MaxEffect: 15000, Status: 1 },
    { Id: 4, Name: 'Phiếu giảm giá 20%', Type: 'Percent', Amount: 20, MinEffect: 40000, MaxEffect: 20000, Status: 1 },
    { Id: 5, Name: 'Phiếu giảm giá 5.000 đồng', Type: 'Value', Amount: 5000, MinEffect: 5000, MaxEffect: 5000, Status: 1 },
    { Id: 6, Name: 'Phiếu giảm giá 10.000 đồng', Type: 'Value', Amount: 10000, MinEffect: 10000, MaxEffect: 10000, Status: 1 },
    { Id: 7, Name: 'Phiếu giảm giá 15.000 đồng', Type: 'Value', Amount: 15000, MinEffect: 15000, MaxEffect: 15000, Status: 1 },
    { Id: 8, Name: 'Phiếu giảm giá 20.000 đồng', Type: 'Value', Amount: 20000, MinEffect: 20000, MaxEffect: 20000, Status: 1 },
];

export const userVouchers = [
    { Id: 1, ReceiveDate: '2025-06-04 14:30:00', UserId: 5, VoucherId: 2 },
    { Id: 2, ReceiveDate: '2025-06-04 14:30:00', UserId: 5, VoucherId: 6 },
    { Id: 3, ReceiveDate: '2025-06-04 14:30:00', UserId: 6, VoucherId: 3 },
    { Id: 4, ReceiveDate: '2025-06-04 14:30:00', UserId: 7, VoucherId: 8 },
];

export const invitations = [
    { Id: 1, Name: 'Find more player', Booked: 0, JoiningCost: 60000, TotalPlayer: 3, AvailablePlayer: 1, Standard: 'Pro', KindOfSport: 'Pickleball', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-04-21', StartTime: '07:00:00', EndTime: '09:00:00', PostingDate: '2025-04-19', Status: 1, UserId: 5, BookingId: null },
    { Id: 2, Name: 'Find more player', Booked: 1, JoiningCost: 0, TotalPlayer: 2, AvailablePlayer: 1, Standard: 'New', KindOfSport: null, Location: null, Longitude: null, Latitude: null, Date: null, StartTime: '09:30:00', EndTime: '11:30:00', PostingDate: '2025-06-03', Status: 1, UserId: 5, BookingId: 3 },
    { Id: 3, Name: 'Find more player', Booked: 0, JoiningCost: 80000, TotalPlayer: 5, AvailablePlayer: 1, Standard: null, KindOfSport: 'Football', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-10-02', StartTime: '12:00:00', EndTime: '14:00:00', PostingDate: '2025-10-01', Status: 1, UserId: 6, BookingId: null },
    { Id: 4, Name: null, Booked: 0, JoiningCost: 90000, TotalPlayer: 9, AvailablePlayer: 1, Standard: 'New', KindOfSport: 'Badminton', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-11-28', StartTime: '14:30:00', EndTime: '16:30:00', PostingDate: '2025-11-27', Status: 1, UserId: 5, BookingId: null },
    { Id: 5, Name: 'Find more player', Booked: 1, JoiningCost: 40000, TotalPlayer: 2, AvailablePlayer: 1, Standard: 'New', KindOfSport: null, Location: null, Longitude: null, Latitude: null, Date: null, StartTime: '17:00:00', EndTime: '19:00:00', PostingDate: '2025-06-03', Status: 1, UserId: 6, BookingId: 4 },
    { Id: 6, Name: null, Booked: 1, JoiningCost: 70000, TotalPlayer: 6, AvailablePlayer: 1, Standard: null, KindOfSport: null, Location: null, Longitude: null, Latitude: null, Date: null, StartTime: '19:30:00', EndTime: '21:30:00', PostingDate: '2025-06-03', Status: 1, UserId: 7, BookingId: 6 },
    { Id: 7, Name: 'Find more player', Booked: 0, JoiningCost: 70000, TotalPlayer: 7, AvailablePlayer: 1, Standard: 'Fair play', KindOfSport: 'Football', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-05-04', StartTime: '07:00:00', EndTime: '11:30:00', PostingDate: '2025-05-03', Status: 1, UserId: 8, BookingId: null },
    { Id: 8, Name: 'Find more player', Booked: 1, JoiningCost: 80000, TotalPlayer: 6, AvailablePlayer: 1, Standard: null, KindOfSport: null, Location: null, Longitude: null, Latitude: null, Date: null, StartTime: '09:30:00', EndTime: '14:00:00', PostingDate: '2025-06-03', Status: 1, UserId: 8, BookingId: 8 },
    { Id: 9, Name: null, Booked: 0, JoiningCost: 50000, TotalPlayer: 4, AvailablePlayer: 1, Standard: null, KindOfSport: 'Pickleball', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-01-09', StartTime: '12:00:00', EndTime: '16:30:00', PostingDate: '2025-01-08', Status: 1, UserId: 7, BookingId: null },
    { Id: 10, Name: 'Find more player', Booked: 0, JoiningCost: 40000, TotalPlayer: 4, AvailablePlayer: 1, Standard: 'Fair play', KindOfSport: 'Football', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-02-28', StartTime: '14:30:00', EndTime: '19:00:00', PostingDate: '2025-02-27', Status: 1, UserId: 7, BookingId: null },
    { Id: 11, Name: 'Find more player', Booked: 0, JoiningCost: 90000, TotalPlayer: 3, AvailablePlayer: 1, Standard: null, KindOfSport: 'Badminton', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-11-15', StartTime: '17:00:00', EndTime: '21:30:00', PostingDate: '2025-11-14', Status: 1, UserId: 6, BookingId: null },
    { Id: 12, Name: null, Booked: 0, JoiningCost: 0, TotalPlayer: 1, AvailablePlayer: 1, Standard: 'Fair play', KindOfSport: 'Badminton', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-03-07', StartTime: '09:30:00', EndTime: '21:30:00', PostingDate: '2025-03-06', Status: 1, UserId: 5, BookingId: null },
    { Id: 13, Name: null, Booked: 1, JoiningCost: 50000, TotalPlayer: 1, AvailablePlayer: 1, Standard: null, KindOfSport: null, Location: null, Longitude: null, Latitude: null, Date: null, StartTime: '12:00:00', EndTime: '19:00:00', PostingDate: '2025-06-03', Status: 1, UserId: 6, BookingId: 1 },
    { Id: 14, Name: 'Find more player', Booked: 0, JoiningCost: 80000, TotalPlayer: 3, AvailablePlayer: 1, Standard: 'Pro', KindOfSport: 'Pickleball', Location: '123 Đường Hoa Phượng, Quận 7, TP. HCM', Longitude: '1', Latitude: '1', Date: '2025-06-04', StartTime: '09:30:00', EndTime: '14:00:00', PostingDate: '2025-06-03', Status: 1, UserId: 6, BookingId: null },
];

export const userInvitations = [
    { Id: 1, JoinDate: '2025-06-04 14:30:00', Status: 1, UserId: 6, InvitationId: 1 },
    { Id: 2, JoinDate: '2025-06-04 14:30:00', Status: 1, UserId: 7, InvitationId: 1 },
    { Id: 3, JoinDate: '2025-06-04 14:30:00', Status: 1, UserId: 7, InvitationId: 3 },
];
