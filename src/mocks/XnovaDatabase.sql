--USE MASTER

--DROP DATABASE Xnova


--CREATE DATABASE Xnova

--USE Xnova

IF OBJECT_ID('dbo.[UserInvitation]', 'U') IS NOT NULL
    DROP TABLE dbo.[UserInvitation];
    GO
IF OBJECT_ID('dbo.[Invitation]', 'U') IS NOT NULL
    DROP TABLE dbo.[Invitation];
    GO
IF OBJECT_ID('dbo.[UserVoucher]', 'U') IS NOT NULL
    DROP TABLE dbo.[UserVoucher];
    GO
IF OBJECT_ID('dbo.[Voucher]', 'U') IS NOT NULL
    DROP TABLE dbo.[Voucher];
    GO
IF OBJECT_ID('dbo.[Friend]', 'U') IS NOT NULL
    DROP TABLE dbo.[Friend];
    GO
IF OBJECT_ID('dbo.[Relationship]', 'U') IS NOT NULL
    DROP TABLE dbo.[Relationship];
    GO
IF OBJECT_ID('dbo.[SaveField]', 'U') IS NOT NULL
    DROP TABLE dbo.[SaveField];
    GO
IF OBJECT_ID('dbo.[Message]', 'U') IS NOT NULL
    DROP TABLE dbo.[Message];
    GO
IF OBJECT_ID('dbo.[Chatbox]', 'U') IS NOT NULL
    DROP TABLE dbo.[Chatbox];
    GO
IF OBJECT_ID('dbo.[Payment]', 'U') IS NOT NULL
    DROP TABLE dbo.[Payment];
    GO
IF OBJECT_ID('dbo.[BookingSlot]', 'U') IS NOT NULL
    DROP TABLE dbo.[BookingSlot];
    GO
IF OBJECT_ID('dbo.[Booking]', 'U') IS NOT NULL
    DROP TABLE dbo.[Booking];
    GO
IF OBJECT_ID('dbo.[Slot]', 'U') IS NOT NULL
    DROP TABLE dbo.[Slot];
    GO
IF OBJECT_ID('dbo.[FavoriteField]', 'U') IS NOT NULL
    DROP TABLE dbo.[FavoriteField];
    GO
IF OBJECT_ID('dbo.[Field]', 'U') IS NOT NULL
    DROP TABLE dbo.[Field];
    GO
IF OBJECT_ID('dbo.[Image]', 'U') IS NOT NULL
    DROP TABLE dbo.[Image];
    GO
IF OBJECT_ID('dbo.[Venue]', 'U') IS NOT NULL
    DROP TABLE dbo.[Venue];
    GO
IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
    DROP TABLE dbo.[User];
    GO
IF OBJECT_ID('dbo.[Type]', 'U') IS NOT NULL
    DROP TABLE dbo.[Type];
    GO


CREATE TABLE [Type] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL
);

CREATE TABLE [User] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Email       NVARCHAR(255),
    Password    NVARCHAR(255),
    Image       NVARCHAR(255),
    Role        NVARCHAR(20),
    Description NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Point       INT,
    Type        NVARCHAR(255),
    Status      INT
);

CREATE TABLE [Venue] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Address     NVARCHAR(255),
    Longitude   NVARCHAR(255),
    Latitude    NVARCHAR(255),
    Contact     NVARCHAR(255),
    Status      INT,
    UserId      INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);

CREATE TABLE [Image] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Link        NVARCHAR(255),
    Status      INT,
    VenueId     INT,
    FOREIGN KEY (VenueId) REFERENCES [Venue](Id)
);

CREATE TABLE [Field] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Description NVARCHAR(255),
    Status      INT,
    TypeId      INT,
    VenueId     INT,
    FOREIGN KEY (TypeId) REFERENCES [Type](Id),
    FOREIGN KEY (VenueId) REFERENCES [Venue](Id)
);

CREATE TABLE [FavoriteField] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    SetDate     DATETIME,
    UserId      INT,
    FieldId     INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (FieldId) REFERENCES [Field](Id)
);

CREATE TABLE [Slot] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    StartTime   TIME,
    EndTime     TIME,
    Price       INT,
    Status      INT,
    FieldId     INT,
    FOREIGN KEY (FieldId) REFERENCES [Field](Id)
);

CREATE TABLE [Booking] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Date        DATE,
    Rating      INT,
    Feedback    NVARCHAR(255),
    CurrentDate DATETIME,
    Status      INT,
    UserId      INT,
    FieldId     INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (FieldId) REFERENCES [Field](Id)
);

CREATE TABLE [BookingSlot] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    BookingId   INT,
    SlotId      INT,
    FOREIGN KEY (BookingId) REFERENCES [Booking](Id),
    FOREIGN KEY (SlotId) REFERENCES [Slot](Id)
);

CREATE TABLE [Payment] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Method      NVARCHAR(255),
    Amount      INT,
    Note        NVARCHAR(255),
    Date        DATETIME,
    Status      INT,
    BookingId   INT,
    FOREIGN KEY (BookingId) REFERENCES [Booking](Id)
);

CREATE TABLE [Chatbox] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Status      INT,
    UserId      INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);

CREATE TABLE [Message] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Content     NVARCHAR(255),
    Date        DATETIME,
    Status      INT,
    ChatboxId   INT,
    FOREIGN KEY (ChatboxId) REFERENCES [Chatbox](Id)
);

CREATE TABLE [SaveField] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    SetDate     DATETIME,
    UserId      INT,
    FieldId     INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (FieldId) REFERENCES [Field](Id)
);

CREATE TABLE [Relationship] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL
);

CREATE TABLE [Friend] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    FriendId    INT,
    UserId      INT,
    RelationshipId  INT,
    FOREIGN KEY (FriendId) REFERENCES [User](Id),
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (RelationshipId) REFERENCES [Relationship](Id)
);

CREATE TABLE [Voucher] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(255) NOT NULL,
    Type        NVARCHAR(255) NOT NULL,
    Amount      INT,
    MinEffect   INT,
    MaxEffect   INT,
    Status      INT
);

CREATE TABLE [UserVoucher] (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    ReceiveDate DATETIME,
    UserId      INT,
    VoucherId   INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (VoucherId) REFERENCES [Voucher](Id)
);

CREATE TABLE [Invitation] (
    Id              INT PRIMARY KEY IDENTITY(1,1),
    Name            NVARCHAR(255),
    Booked          INT,
    JoiningCost     INT,
    TotalPlayer     INT,
    AvailablePlayer INT,
    Standard        NVARCHAR(255),
    KindOfSport     NVARCHAR(255),
    Location        NVARCHAR(255),
    Date            DATE,
    StartTime       TIME,
    EndTime         TIME,
    PostingDate     DATE,
    Status          INT,
    UserId          INT,
    BookingId       INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (BookingId) REFERENCES [Booking](Id)
);

CREATE TABLE [UserInvitation] (
    Id              INT PRIMARY KEY IDENTITY(1,1),
    JoinDate        DATETIME,
    Status          INT,
    UserId          INT,
    InvitationId    INT,
    FOREIGN KEY (UserId) REFERENCES [User](Id),
    FOREIGN KEY (InvitationId) REFERENCES [Invitation](Id)
);


--Type (Name)
INSERT INTO [Type] VALUES (N'Football')
INSERT INTO [Type] VALUES (N'Badminton')
INSERT INTO [Type] VALUES (N'Pickleball')

--User (Name, Email, Password, Image, Role, Description, PhoneNumber, Point, Type, Status)
INSERT INTO [User] VALUES (N'Đặng Ngọc Hải Triều', N'dangngochaitrieu@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Admin', N'abc', N'0123456789', 0, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Huy', N'nguyengiahuy@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Owner', N'abc', N'0123456789', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Hoàng', N'nguyengiahoang@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Owner', N'abc', N'0123456789', 200000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Phạm Thành Danh', N'phamthanhdanh@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Owner', N'abc', N'0123456789', 300000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Thành Dương', N'nguyenthanhduong@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Customer', N'abc', N'0123456789', 1000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Lê Hữu Thành Tín', N'lehuuthanhtin@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Customer', N'abc', N'0123456789', 2000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Trương Kim Hằng', N'truongkimhang@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Customer', N'abc', N'0123456789', 3000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Lê Minh Khoa', N'leminhkhoa@gmail.com', N'123456', N'https://i.pinimg.com/736x/b0/91/5f/b0915f3c86472ea1ad3d1472cebd6c15.jpg', N'Customer', N'abc', N'0123456789', 4000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)

--Venue (Name, Address, Longitude, Latitude, Contact, Status, UserId)
INSERT INTO [Venue] VALUES (N'Sunrise Sports Arena', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', N'0', N'0', N'0123456789', 1, 2)--Huy
INSERT INTO [Venue] VALUES (N'Green Field Center', N'456 Đường Nguyễn Văn Cừ, Quận 5, TP. HCM', N'0', N'0', N'0123456789', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'Victory Stadium', N'789 Đường Trần Hưng Đạo, Quận 1, TP. HCM', N'0', N'0', N'0123456789', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'Cityside Court', N'12 Đường Lê Văn Sỹ, Quận 3, TP. HCM', N'0', N'0', N'0123456789', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'The Arena Zone', N'34 Đường Phan Xích Long, Phú Nhuận, TP. HCM', N'0', N'0', N'0123456789', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'Mega Sports Hub', N'89 Đường Cộng Hòa, Tân Bình, TP. HCM', N'0', N'0', N'0123456789', 1, 4)--Danh

--Image (Name, Link, Status, VenueId)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)--Huy
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)--Huy
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)--Huy
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)--Huy
INSERT INTO [Image] VALUES (N'Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)--Huy
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)--Hoang
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)--Hoang
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)--Hoang
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 6', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)--Hoang
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 4)--Danh
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)--Danh
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)--Danh
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)--Danh
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)--Danh
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 6)--Danh
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 6)--Danh

--Field (Name, Description, Status, TypeId, VenueId)
INSERT INTO [Field] VALUES (N'Football Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)   --Huy   1
INSERT INTO [Field] VALUES (N'Football Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)   --Huy   2
INSERT INTO [Field] VALUES (N'Football Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)   --Huy   3
INSERT INTO [Field] VALUES (N'Football Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)   --Huy   4
INSERT INTO [Field] VALUES (N'Football Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)   --Huy   5
INSERT INTO [Field] VALUES (N'Pickleball Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3, 2) --Hoang 6
INSERT INTO [Field] VALUES (N'Pickleball Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3, 2) --Hoang 7
INSERT INTO [Field] VALUES (N'Pickleball Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3, 2) --Hoang 8
INSERT INTO [Field] VALUES (N'Badminton Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 9
INSERT INTO [Field] VALUES (N'Badminton Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 10
INSERT INTO [Field] VALUES (N'Badminton Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 11
INSERT INTO [Field] VALUES (N'Badminton Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 12
INSERT INTO [Field] VALUES (N'Badminton Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 13
INSERT INTO [Field] VALUES (N'Badminton Field 6', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 3)  --Hoang 14
INSERT INTO [Field] VALUES (N'Pickleball Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3, 4) --Danh  15
INSERT INTO [Field] VALUES (N'Football Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 5)   --Danh  16
INSERT INTO [Field] VALUES (N'Football Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 5)   --Danh  17
INSERT INTO [Field] VALUES (N'Football Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 5)   --Danh  18
INSERT INTO [Field] VALUES (N'Football Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 5)   --Danh  19
INSERT INTO [Field] VALUES (N'Badminton Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 6)  --Danh  20
INSERT INTO [Field] VALUES (N'Badminton Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2, 6)  --Danh  21

--FavoriteField (SetDate, UserId, FieldId)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 5, 16)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 5, 8)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 5, 20)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 6, 16)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 6, 15)
INSERT INTO [FavoriteField] VALUES ('2025-06-04 14:30:00', 7, 9)

--Slot (Name, StartTime, EndTime, Price, Status, FieldId)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 1', '07:00:00', '09:00:00', 100000, 1, 21)

INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 2', '09:30:00', '11:30:00', 100000, 1, 21)

INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 3', '12:00:00', '14:00:00', 100000, 1, 21)

INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 4', '14:30:00', '16:30:00', 100000, 1, 21)

INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 5', '17:00:00', '19:00:00', 100000, 1, 21)

INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 1)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 2)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 3)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 4)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 5)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 6)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 7)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 8)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 9)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 10)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 11)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 12)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 13)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 14)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 15)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 16)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 17)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 18)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 19)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 20)
INSERT INTO [Slot] VALUES (N'Slot 6', '19:30:00', '21:30:00', 100000, 1, 21)

--Booking (Date, Rating, Feedback, CurrentDate, Status, UserId, FieldId)
INSERT INTO [Booking] VALUES ('2025-06-04', 5, N'Perfect!', '2025-06-04 14:30:00', 1, 5, 16)
INSERT INTO [Booking] VALUES ('2025-06-04', 4, N'Good!', '2025-06-04 14:30:00', 1, 5, 8)
INSERT INTO [Booking] VALUES ('2025-06-04', 5, N'Good!', '2025-06-04 14:30:00', 1, 5, 20)
INSERT INTO [Booking] VALUES ('2025-06-04', 5, N'Ok!', '2025-06-04 14:30:00', 1, 6, 15)
INSERT INTO [Booking] VALUES ('2025-06-04', 5, N'Good!', '2025-06-04 14:30:00', 1, 7, 9)
INSERT INTO [Booking] VALUES ('2025-06-04', 1, N'Very bad!', '2025-06-04 14:30:00', 1, 7, 21)
INSERT INTO [Booking] VALUES ('2025-06-04', 3, N'Good!', '2025-06-04 14:30:00', 1, 8, 8)
INSERT INTO [Booking] VALUES ('2025-06-04', 2, N'Bad!', '2025-06-04 14:30:00', 1, 8, 21)

--BookingSlot (BookingId, SlotId)
INSERT INTO [BookingSlot] VALUES (1, 37)
INSERT INTO [BookingSlot] VALUES (2, 71)
INSERT INTO [BookingSlot] VALUES (2, 92)
INSERT INTO [BookingSlot] VALUES (3, 41)
INSERT INTO [BookingSlot] VALUES (3, 62)
INSERT INTO [BookingSlot] VALUES (3, 83)
INSERT INTO [BookingSlot] VALUES (3, 104)

INSERT INTO [BookingSlot] VALUES (4, 15)
INSERT INTO [BookingSlot] VALUES (4, 36)
INSERT INTO [BookingSlot] VALUES (4, 57)

INSERT INTO [BookingSlot] VALUES (5, 93)
INSERT INTO [BookingSlot] VALUES (6, 84)

INSERT INTO [BookingSlot] VALUES (7, 113)
INSERT INTO [BookingSlot] VALUES (8, 105)
INSERT INTO [BookingSlot] VALUES (8, 126)

--Payment (Method, Amount, Note, Date, Status, BookingId)
INSERT INTO [Payment] VALUES (N'VNPay', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 1)
INSERT INTO [Payment] VALUES (N'VNPay', 200000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 2)
INSERT INTO [Payment] VALUES (N'VNPay', 400000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 3)
INSERT INTO [Payment] VALUES (N'Momo', 300000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 4)
INSERT INTO [Payment] VALUES (N'Momo', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 5)
INSERT INTO [Payment] VALUES (N'Momo', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 6)
INSERT INTO [Payment] VALUES (N'VNPay', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 7)
INSERT INTO [Payment] VALUES (N'VNPay', 200000, N'aaaaaaaaaaaaaaaaaaaaaaa', '2025-06-04 14:30:00', 1, 8)

--Chatbox (Name, Status, UserId)
INSERT INTO [Chatbox] VALUES (N'Supercalifragilisticexpialidocious AI', 1, 1)
INSERT INTO [Chatbox] VALUES (N'My Amazing AI', 1, 5)
INSERT INTO [Chatbox] VALUES (N'Good job AI', 1, 6)
INSERT INTO [Chatbox] VALUES (N'Kawaii AI', 1, 7)
INSERT INTO [Chatbox] VALUES (N'AI Support', 1, 8)

--Message (Content, Date, Status, ChatboxId)
INSERT INTO [Message] VALUES (N'What is supercalifragilisticexpialidocious?', '2025-06-04 14:30:00', 1, 1)
INSERT INTO [Message] VALUES (N'Hello, my name is Duong!', '2025-06-04 14:30:00', 1, 2)
INSERT INTO [Message] VALUES (N'Hello, my name is Tin!', '2025-06-04 14:30:00', 1, 3)
INSERT INTO [Message] VALUES (N'Hello, my name is Hang!', '2025-06-04 14:30:00', 1, 4)
INSERT INTO [Message] VALUES (N'Hello, my name is Khoa!', '2025-06-04 14:30:00', 1, 5)

--SaveField (SetDate, UserId, FieldId)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 5, 16)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 5, 20)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 6, 14)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 7, 9)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 7, 10)
INSERT INTO [SaveField] VALUES ('2025-06-04 14:30:00', 7, 11)

--Relationship (Name)
INSERT INTO [Relationship] VALUES (N'Friend')
INSERT INTO [Relationship] VALUES (N'Best Friend')
INSERT INTO [Relationship] VALUES (N'Teammate')
INSERT INTO [Relationship] VALUES (N'Lover')
INSERT INTO [Relationship] VALUES (N'Important')
INSERT INTO [Relationship] VALUES (N'Other')

--Friend (FriendId, UserId, RelationshipId)
INSERT INTO [Friend] VALUES (2, 3, 5)
INSERT INTO [Friend] VALUES (4, 5, 3)
INSERT INTO [Friend] VALUES (4, 6, 3)
INSERT INTO [Friend] VALUES (5, 6, 3)
INSERT INTO [Friend] VALUES (7, 8, 2)

--Voucher (Name, Type, Amount, MinEffect, MaxEffect, Status)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 5%', N'Percent', 5, 10000, 5000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 10%', N'Percent', 10, 20000, 10000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 15%', N'Percent', 15, 30000, 15000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 20%', N'Percent', 20, 40000, 20000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 5.000 đồng', N'Value', 5000, 5000, 5000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 10.000 đồng', N'Value', 10000, 10000, 10000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 15.000 đồng', N'Value', 15000, 15000, 15000, 1)
INSERT INTO [Voucher] VALUES (N'Phiếu giảm giá 20.000 đồng', N'Value', 20000, 20000, 20000, 1)

--UserVoucher (ReceiveDate, UserId, VoucherId)
INSERT INTO [UserVoucher] VALUES ('2025-06-04 14:30:00', 5, 2)
INSERT INTO [UserVoucher] VALUES ('2025-06-04 14:30:00', 5, 6)
INSERT INTO [UserVoucher] VALUES ('2025-06-04 14:30:00', 6, 3)
INSERT INTO [UserVoucher] VALUES ('2025-06-04 14:30:00', 7, 8)

--Invitation (Name, Booked, JoiningCost, TotalPlayer, AvailablePlayer, Standard, KindOfSport, Location, Date, StartTime, EndTime, PostingDate, Status, UserId, BookingId)
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 60000, 2, 1, N'Pro', N'Pickleball', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-04-21', '07:00:00', '09:00:00', '2025-04-19', 1, 5, null);
INSERT INTO [Invitation] VALUES (N'Find more player', 1, 0, 2, 1, N'New', null, null, null, '09:30:00', '11:30:00', '2025-06-03', 1, 5, 3);
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 80000, 5, 1, null, N'Football', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-10-02', '12:00:00', '14:00:00', '2025-10-01', 1, 6, null);
INSERT INTO [Invitation] VALUES (null, 0, 90000, 9, 1, N'New', N'Badminton', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-11-28', '14:30:00', '16:30:00', '2025-11-27', 1, 5, null);
INSERT INTO [Invitation] VALUES (N'Find more player', 1, 40000, 2, 1, N'New', null, null, null, '17:00:00', '19:00:00', '2025-06-03', 1, 6, 4);
INSERT INTO [Invitation] VALUES (null, 1, 70000, 6, 1, null, null, null, null, '19:30:00', '21:30:00', '2025-06-03', 1, 7, 6);
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 70000, 7, 1, N'Fair play', N'Football', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-05-04', '07:00:00', '11:30:00', '2025-05-03', 1, 8, null);
INSERT INTO [Invitation] VALUES (N'Find more player', 1, 80000, 6, 1, null, null, null, null, '09:30:00', '14:00:00', '2025-06-03', 1, 8, 8);
INSERT INTO [Invitation] VALUES (null, 0, 50000, 4, 1, null, N'Pickleball', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-01-09', '12:00:00', '16:30:00', '2025-01-08', 1, 7, null);
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 40000, 4, 1, N'Fair play', N'Football', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-02-28', '14:30:00', '19:00:00', '2025-02-27', 1, 7, null);
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 90000, 3, 1, null, N'Badminton', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-11-15', '17:00:00', '21:30:00', '2025-11-14', 1, 6, null);
INSERT INTO [Invitation] VALUES (null, 0, 0, 1, 1, N'Fair play', N'Badminton', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-03-07', '09:30:00', '21:30:00', '2025-03-06', 1, 5, null);
INSERT INTO [Invitation] VALUES (null, 1, 50000, 1, 1, null, null, null, null, '12:00:00', '19:00:00', '2025-06-03', 1, 6, 1);
INSERT INTO [Invitation] VALUES (N'Find more player', 0, 80000, 3, 1, N'Pro', N'Pickleball', N'123 Đường Hoa Phượng, Quận 7, TP. HCM', '2025-06-04', '09:30:00', '14:00:00', '2025-06-03', 1, 6, null);

--UserInvitation (JoinDate, Status, UserId, InvitationId)
INSERT INTO [UserInvitation] VALUES ('2025-06-04 14:30:00', 1, 6, 1)
INSERT INTO [UserInvitation] VALUES ('2025-06-04 14:30:00', 1, 7, 1)
INSERT INTO [UserInvitation] VALUES ('2025-06-04 14:30:00', 1, 7, 3)











select *
from (Booking bk join Field fi on bk.FieldId = fi.Id) join Slot sl on sl.FieldId = fi.Id
ORDER BY bk.Id

select im.Name, fi.Name from Image im join Field fi on im.Id = fi.Id

select bk.Id as 'Booking Id', bk.Rating, us.Name, fi.Name, fi.Id as 'Field Id', sl.Id as 'Slot Id'
from ((Booking bk join Field fi on bk.FieldId = fi.Id) join [User] us on bk.UserId = us.Id) join Slot sl on sl.Id % 21 = fi.Id % 21
ORDER BY us.Name

select bk.Id as 'Booking Id', bk.Rating, us.Name, fi.Name, fi.Id as 'Field Id'
from ((Booking bk join Field fi on bk.FieldId = fi.Id) join [User] us on bk.UserId = us.Id)

select * from (Booking bk join Field fi on bk.FieldId = fi.Id) join [User] us on bk.UserId = us.Id


SELECT * FROM [Type]
SELECT * FROM [User]
SELECT * FROM [Venue]
SELECT * FROM [Image]
SELECT * FROM [Field]
SELECT * FROM [FavoriteField]
SELECT * FROM [Slot]
SELECT * FROM [Booking]
SELECT * FROM [BookingSlot]
SELECT * FROM [Payment]
SELECT * FROM [Chatbox]
SELECT * FROM [Message]
SELECT * FROM [SaveField]
SELECT * FROM [Relationship]
SELECT * FROM [Friend]
SELECT * FROM [Voucher]
SELECT * FROM [UserVoucher]
SELECT * FROM [Invitation]
SELECT * FROM [UserInvitation]