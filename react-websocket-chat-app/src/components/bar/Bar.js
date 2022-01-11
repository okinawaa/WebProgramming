import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat'



function Bar(props) {
    return (
        <>
            <Box mb={4}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <Box mr={2}>
                            <ChatIcon fontSize={"large"}/>
                        </Box>
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