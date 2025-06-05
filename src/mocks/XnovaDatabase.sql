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

--Type (Id, Name)
INSERT INTO [Type] VALUES (N'Football')
INSERT INTO [Type] VALUES (N'Badminton')
INSERT INTO [Type] VALUES (N'Pickleball')

--User (Name, Email, Password, Image, Role, Description, PhoneNumber, Point, Type, Status)
INSERT INTO [User] VALUES (N'Đặng Ngọc Hải Triều', N'dangngochaitrieu@gmail.com', N'123456', N'abc', N'Admin', N'abc', N'0123456789', 0, N'', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Huy', N'nguyengiahuy@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 100000, N'', 1)
INSERT INTO [User] VALUES (N'Nguyễn Gia Hoàng', N'nguyengiahoang@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 200000, N'', 1)
INSERT INTO [User] VALUES (N'Phạm Thành Danh', N'phamthanhdanh@gmail.com', N'123456', N'abc', N'Owner', N'abc', N'0123456789', 300000, N'', 1)
INSERT INTO [User] VALUES (N'Nguyễn Thành Dương', N'nguyenthanhduong@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 1000, N'', 1)
INSERT INTO [User] VALUES (N'Lê Hữu Thành Tín', N'lehuuthanhtin@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 2000, N'', 1)
INSERT INTO [User] VALUES (N'Trương Kim Hằng', N'truongkimhang@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 3000, N'', 1)
INSERT INTO [User] VALUES (N'Lê Minh Khoa', N'leminhkhoa@gmail.com', N'123456', N'abc', N'Customer', N'abc', N'0123456789', 4000, N'', 1)

--Venue (Name, Address, Contact, Status, UserId)
INSERT INTO [Venue] VALUES (N'1aaaaaaaaaaaaaaaaaaaaaaa', N'aaaaaaaaaaaaaaaaaaaaaaa', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)--Huy
INSERT INTO [Venue] VALUES (N'1bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'2bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', N'bbbbbbbbbbbbbbbbbbbbbbb', 1, 3)--Hoang
INSERT INTO [Venue] VALUES (N'1ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'2ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', 1, 4)--Danh
INSERT INTO [Venue] VALUES (N'3ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', N'ccccccccccccccccccccccc', 1, 4)--Danh

--Image (Name, Link, Status, VenueId)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)
INSERT INTO [Image] VALUES (N'Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 2)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 5', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 6', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 3)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 4)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)
INSERT INTO [Image] VALUES (N'Field 3', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)
INSERT INTO [Image] VALUES (N'Field 4', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 5)
INSERT INTO [Image] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 6)
INSERT INTO [Image] VALUES (N'Field 2', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 6)







--Field (Name, Description, Status, TypeId, VenueId)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)
INSERT INTO [Field] VALUES (N'Field 1', N'aaaaaaaaaaaaaaaaaaaaaaa', 1, 1, 1)















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
