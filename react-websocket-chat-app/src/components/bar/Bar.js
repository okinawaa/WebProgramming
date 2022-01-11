import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

function Bar(props) {
    return (
        <>
            <Box mb={4}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <Typography variant={"h6"}>
                            React Chat App
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Bar;