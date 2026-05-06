const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());



app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.url}`
    );

    next();
});



const BASE_URL =
    "http://20.207.122.201/evaluation-service";



const authData = {
    email:
        "kh.en.p2mca25122@kh.students.amrita.edu",

    name:
        "athul krishna s kamath",

    rollNo:
        "kh.en.p2mca25122",

    accessCode: "PTBMmQ",

    clientID:
        "02369c30-13c3-4374-b81f-0909214d7791",

    clientSecret:
        "tsgxzFhTgaJrJyJr",
};



const PRIORITY_WEIGHT = {
    placement: 3,
    result: 2,
    event: 1,
};



app.get(
    "/notifications/top",
    async (req, res) => {
        try {
            console.log(
                "Generating token..."
            );



            const authResponse =
                await axios.post(
                    `${BASE_URL}/auth`,
                    authData
                );



            const token =
                authResponse.data
                    .access_token;

            console.log(
                "Token generated"
            );



            const response =
                await axios.get(
                    `${BASE_URL}/notifications`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            console.log(
                "Notifications fetched"
            );

  

            const notifications =
                response.data
                    .notifications || [];



            const formatted =
                notifications.map(
                    (item) => ({
                        id:
                            item.ID ||
                            Math.random(),

                        type:
                            item.Type?.toLowerCase() ||
                            "event",

                        message:
                            item.Message ||
                            "No message",

                        timestamp:
                            item.Timestamp ||
                            new Date(),
                    })
                );



            formatted.sort(
                (a, b) => {
                    const priorityDiff =
                        (PRIORITY_WEIGHT[
                            b.type
                        ] || 0) -
                        (PRIORITY_WEIGHT[
                            a.type
                        ] || 0);

                    if (
                        priorityDiff !==
                        0
                    ) {
                        return priorityDiff;
                    }

                    return (
                        new Date(
                            b.timestamp
                        ) -
                        new Date(
                            a.timestamp
                        )
                    );
                }
            );



            const top10 =
                formatted.slice(
                    0,
                    10
                );


            res.status(200).json({
                success: true,
                count: top10.length,
                notifications:
                    top10,
            });
        } catch (error) {
            console.log(
                "ERROR OCCURRED"
            );

            if (
                error.response
            ) {
                console.log(
                    error.response
                        .data
                );
            } else {
                console.log(
                    error.message
                );
            }

            res.status(500).json({
                success: false,
                message:
                    "Failed to fetch notifications",
            });
        }
    }
);



app.get("/", (req, res) => {
    res.send(
        "Backend running successfully"
    );
});



const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});