

CREATE TABLE SCUser
(
    UID varchar(50),
    fname varchar(50),
    lname varchar(50),
    email varchar(100),
    password varchar(50),
    PRIMARY KEY (UID)

);

CREATE TABLE API_KEY(
    vendor varchar(20),
    api_id varchar(300),
    PRIMARY KEY (api_id)

);


CREATE TABLE Engine(
    EID varchar(50),
    AID varchar(300),
    model varchar(30),
    PRIMARY KEY (EID),
    FOREIGN KEY (AID) REFERENCES API_KEY(api_id)
);


CREATE TABLE Message(
    message_content TEXT,
    MID varchar(50) UNIQUE,
    UID varchar(50),
    EID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (EID) REFERENCES Engine(EID)
);


CREATE TABLE Session(
    sname varchar(50),
    SID varchar(50),
    PRIMARY KEY (SID)
);

CREATE TABLE History(
    UID varchar(50),
    EID varchar(50),
    SID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (EID) REFERENCES Engine(EID),
    FOREIGN KEY (SID) REFERENCES Session(SID)
);


CREATE TABLE Generates(
    UID varchar(50),
    AID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (AID) REFERENCES API_KEY(api_id)
);

CREATE TABLE Responds(
    EID varchar(50),
    MID varchar(50),
    FOREIGN KEY (EID) REFERENCES Engine(EID),
    FOREIGN KEY (MID) REFERENCES Message(MID)
);

CREATE TABLE Writes(
    UID varchar(50),
    MID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (MID) REFERENCES Message(MID)
);

CREATE TABLE Starts(
    UID varchar(50),
    EID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (EID) REFERENCES Engine(EID)
);

CREATE TABLE Remembers(
    SID varchar(50),
    MID varchar(50),
    FOREIGN KEY (SID) REFERENCES Session(SID),
    FOREIGN KEY (MID) REFERENCES Message(MID)
);

CREATE TABLE Shows(
    UID varchar(50),
    MID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (MID) REFERENCES Message(MID)
);

CREATE TABLE Creates(
    UID varchar(50),
    EID varchar(50),
    FOREIGN KEY (UID) REFERENCES SCUser(UID),
    FOREIGN KEY (EID) REFERENCES Engine(EID)
);

CREATE TABLE Uses(
    EID varchar(50),
    AID varchar(50),
    FOREIGN KEY (EID) REFERENCES Engine(EID),
    FOREIGN KEY (AID) REFERENCES API_KEY(api_id)

);