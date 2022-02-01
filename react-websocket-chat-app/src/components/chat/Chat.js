import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Container,
    Divider,
    FormControl,
    Grid, IconButton,
    List,
    ListItem,
    ListItemText,
    Paper, TextField,
    Typography
} from "@mui/material";
import {ChatMessageDto} from "../../model/ChatMessageDto";
import './Chat.css'
import SendIcon from '@mui/icons-material/Send'


function Chat(props) {

    const scrollBottomRef = useRef(null);


    const webSocket = useRef(null);

    const [chatMessages, setChatMessages] = useState([])

    const [user, setUser] = useState("");
    const [message, setMessage] = useState("")

    useEffect(() => {
        console.log("Opening WebSocket")
        webSocket.current = new WebSocket("ws://localhost:5000")
        webSocket.current.onopen = (event) => {
            console.log("Open : ", event);
        }

        webSocket.current.onClose = (event) => {
            console.log("Close : ", event);
        }

        return () => {
            console.log("Closing WebSocket");
            webSocket.current.close();
        }
    }, [])


    useEffect(() => {
        webSocket.current.onmessage = (event) => {
            console.log(event.data)
            const chatMessageDto = JSON.parse(event.data);
            setChatMessages([...chatMessages, {
                user: chatMessageDto.user,
                message : chatMessageDto.message
            }])

            if(scrollBottomRef.current){
                scrollBottomRef.current.scrollIntoView({behavior:'smooth'})
            }
        }
    }, [chatMessages])

    const handleEnterKey = (event) => {
        if(event.keyCode === 13){ // Enter
            sendMessage()
        }
    }

    const sendMessage = () => {
        if (user && message) {
            webSocket.current.send(
                JSON.stringify(new ChatMessageDto(user,message))
            );
            setMessage("")
        }
    }


    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handleMessageChange = event => {
        setMessage(event.target.value)
    }


    const listChatMessages = chatMessages.map((chatMessageDto, index) => (
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user} : ${chatMessageDto.message}`}/>
        </ListItem>
    ))
    return (
        <>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant={"h4"} gutterBottom>
                            Happy chatting !
                        </Typography>
                        <Divider/>
                        <Grid container spacing={4} alignItems={"center"}>
                            <Grid id={"chat-window"} xs={12} item>
                                <List id={"chat-window-messages"}>
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef}/>
                                </List>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleUserChange}
                                        value={user}
                                        label={"Nickname"}
                                        variant={"outlined"}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleMessageChange}
                                        onKeyDown={handleEnterKey}
                                        value={message}
                                        label={"Type your message..."}
                                        variant={"outlined"}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    onClick={sendMessage}
                                    aria-label={"send"} color={"primary"}>
                                    <SendIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Chat;