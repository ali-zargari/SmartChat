SET search_path TO smartchat;

-- Table for Users
CREATE TABLE Users (
    uid VARCHAR(35) PRIMARY KEY,
    Name VARCHAR(255),
    email VARCHAR(255)
);

-- Table for Sessions
CREATE TABLE Sessions (
    sid VARCHAR(35) PRIMARY KEY,
    sname VARCHAR(255)
);

-- Table for Agents
CREATE TABLE Agents (
    aid VARCHAR(35) PRIMARY KEY,
    current_model VARCHAR(255)
);

-- Table for Engines
CREATE TABLE Engines (
    eid VARCHAR(35) PRIMARY KEY,
    current_model VARCHAR(255),
    engine_priority VARCHAR(35)
);

-- Table for Messages
CREATE TABLE Messages (
    mid VARCHAR(35) PRIMARY KEY,
    content TEXT,
    from_user VARCHAR(35), -- Assuming 'from' is reserved, using from_user instead
    to_agent VARCHAR(35),
    FOREIGN KEY (from_user) REFERENCES Users(uid),
    FOREIGN KEY (to_agent) REFERENCES Agents(aid)
);

-- Table for API_Keys
CREATE TABLE API_Keys (
    api_key VARCHAR(255) PRIMARY KEY,
    model VARCHAR(255),
    user_id VARCHAR(35),
    FOREIGN KEY (user_id) REFERENCES Users(uid)
);





-- Table for Sessions_Users
CREATE TABLE Sessions_Users (
    sid VARCHAR(35),
    uid VARCHAR(35),
    PRIMARY KEY (sid, uid),
    FOREIGN KEY (sid) REFERENCES Sessions(sid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);

-- Table for Sessions_Messages
CREATE TABLE Sessions_Messages (
    sid VARCHAR(35),
    mid VARCHAR(35),
    PRIMARY KEY (sid, mid),
    FOREIGN KEY (sid) REFERENCES Sessions(sid),
    FOREIGN KEY (mid) REFERENCES Messages(mid)
);

-- Table for Agents_Messages
CREATE TABLE Agents_Messages (
    aid VARCHAR(35),
    mid VARCHAR(35),
    PRIMARY KEY (aid, mid),
    FOREIGN KEY (aid) REFERENCES Agents(aid),
    FOREIGN KEY (mid) REFERENCES Messages(mid)
);

-- Table for Engines_Agent
CREATE TABLE Engines_Agent (
    eid VARCHAR(35),
    aid VARCHAR(35),
    PRIMARY KEY (eid, aid),
    FOREIGN KEY (eid) REFERENCES Engines(eid),
    FOREIGN KEY (aid) REFERENCES Agents(aid)
);

-- Engine_APIKeys
CREATE TABLE Engine_APIKeys (
    eid VARCHAR(35),
    api_key VARCHAR(255),
    PRIMARY KEY (eid, api_key),
    FOREIGN KEY (eid) REFERENCES Engines(eid),
    FOREIGN KEY (api_key) REFERENCES API_Keys(api_key)
);

-- User_Messages
CREATE TABLE User_Messages (
    uid VARCHAR(35),
    mid VARCHAR(35),
    PRIMARY KEY (uid, mid),
    FOREIGN KEY (uid) REFERENCES Users(uid),
    FOREIGN KEY (mid) REFERENCES Messages(mid)
);

-- User_APIKeys
CREATE TABLE User_APIKeys (
    uid VARCHAR(35),
    api_key VARCHAR(255),
    PRIMARY KEY (uid, api_key),
    FOREIGN KEY (uid) REFERENCES Users(uid),
    FOREIGN KEY (api_key) REFERENCES API_Keys(api_key)
);
