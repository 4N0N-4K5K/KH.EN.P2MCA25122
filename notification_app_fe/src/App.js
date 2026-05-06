import { useEffect, useState } from "react";

import axios from "axios";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    Pagination,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

function App() {


    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [filter, setFilter] =
        useState("");

    const itemsPerPage = 5;



    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications =
        async () => {
            try {
                const response =
                    await axios.get(
                        "http://localhost:5000/notifications/top"
                    );

                setNotifications(
                    response.data
                        .notifications
                );
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };



    const filteredNotifications =
        notifications.filter(
            (item) =>
                filter
                    ? item.type ===
                      filter
                    : true
        );



    const startIndex =
        (page - 1) * itemsPerPage;

    const displayed =
        filteredNotifications.slice(
            startIndex,
            startIndex +
                itemsPerPage
        );



    const markViewed = (id) => {
        localStorage.setItem(
            id,
            "viewed"
        );

        setNotifications([
            ...notifications,
        ]);
    };



    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            {/* TITLE */}

            <Typography
                variant="h4"
                sx={{
                    mt: 4,
                    mb: 3,
                    fontWeight:
                        "bold",
                    textAlign:
                        "center",
                }}
            >
                Campus Notifications
            </Typography>

            {/* FILTER */}

            <FormControl
                fullWidth
                sx={{ mb: 3 }}
            >
                <InputLabel>
                    Filter
                </InputLabel>

                <Select
                    value={filter}
                    label="Filter"
                    onChange={(e) => {
                        setFilter(
                            e.target
                                .value
                        );

                        setPage(1);
                    }}
                >
                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="placement">
                        Placement
                    </MenuItem>

                    <MenuItem value="result">
                        Result
                    </MenuItem>

                    <MenuItem value="event">
                        Event
                    </MenuItem>
                </Select>
            </FormControl>

            {/* NOTIFICATION CARDS */}

            <Grid container spacing={2}>
                {displayed.map(
                    (item) => (
                        <Grid
                            item
                            xs={12}
                            key={
                                item.id
                            }
                        >
                            <Card
                                onClick={() =>
                                    markViewed(
                                        item.id
                                    )
                                }
                                sx={{
                                    cursor:
                                        "pointer",

                                    backgroundColor:
                                        localStorage.getItem(
                                            item.id
                                        )
                                            ? "#f0f0f0"
                                            : "#ffffff",
                                }}
                            >
                                <CardContent>
                                    <Chip
                                        label={
                                            item.type
                                        }
                                        color={
                                            item.type ===
                                            "placement"
                                                ? "success"
                                                : item.type ===
                                                  "result"
                                                ? "primary"
                                                : "warning"
                                        }
                                        sx={{
                                            mb: 1,
                                        }}
                                    />

                                    <Typography variant="h6">
                                        {
                                            item.message
                                        }
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {
                                            item.timestamp
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>

            {/* PAGINATION */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    mt: 4,
                    mb: 4,
                }}
            >
                <Pagination
                    count={Math.ceil(
                        filteredNotifications.length /
                            itemsPerPage
                    )}
                    page={page}
                    onChange={(
                        e,
                        value
                    ) =>
                        setPage(value)
                    }
                    color="primary"
                />
            </Box>
        </Container>
    );
}

export default App;