--USE MASTER

--DROP DATABASE Xnova


--CREATE DATABASE Xnova

--USE Xnova


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


--Type (Name)
INSERT INTO [Type] VALUES (N'Football')
INSERT INTO [Type] VALUES (N'Badminton')
INSERT INTO [Type] VALUES (N'Pickleball')

--User (Name, Email, Password, Image, Role, Description, PhoneNumber, Point, Type, Status)
INSERT INTO [User] VALUES (N'Đặng Ngọc Hải Triều', N'dangngochaitrieu@gmail.com', N'123456', N'abc', N'Admin', N'abc', N'0123456789', 0, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Huy', N'nguyengiahuy@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 100000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Hoàng', N'nguyengiahoang@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 200000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Phạm Thành Danh', N'phamthanhdanh@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 300000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Nguyễn Thành Dương', N'nguyenthanhduong@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 1000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Lê Hữu Thành Tín', N'lehuuthanhtin@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 2000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Trương Kim Hằng', N'truongkimhang@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 3000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)
INSERT INTO [User] VALUES (N'Lê Minh Khoa', N'leminhkhoa@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 4000, N'aaaaaaaaaaaaaaaaaaaaaaa', 1)

--Venue (Name, Address, Contact, Status, UserId)
INSERT INTO [Venue] VALUES (N'1aaaaaaaaaaaaaaaaaaaaaaa', N'aaaaaaaaaaaaaaaaaaaaaaa', N'0123456789', 1, 2)--Huy
INSERT INTO [Venue] VALUES (N'1bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', N'0123456789', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'2bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', N'0123456789', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'1ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'0123456789', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'2ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'0123456789', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'3ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'0123456789', 1, 4)--Danh

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
