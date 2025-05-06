import React, { useState, useEffect, useRef } from 'react';
import ChatService from '../services/chatService';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  content: string;
  timestamp: Date;
  senderId: 'user' | 'assistant';
  receiverId: 'user' | 'assistant';
  threadId?: string;
  read: boolean;
}

const chatService = new ChatService();

export const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        setIsLoading(true);
        const messageToSend: Message = {
            content: newMessage,
            timestamp: new Date(),
            senderId: 'user',
            receiverId: 'assistant',
            threadId: threadId || undefined,
            read: false
        };

        try {
            const response = await chatService.sendMessage(messageToSend.content);
            setThreadId(response.metadata.thread_id);
            setMessages(prev => [...prev, messageToSend, {
                content: response.content,
                timestamp: new Date(response.timestamp),
                senderId: 'assistant',
                receiverId: 'user',
                threadId: response.metadata.thread_id,
                read: true
            }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', mb: 2, p: 2 }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                justifyContent: message.senderId === 'user' ? 'flex-end' : 'flex-start',
                                mb: 1
                            }}
                        >
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    maxWidth: '70%',
                                    backgroundColor: message.senderId === 'user' ? '#e3f2fd' : '#f5f5f5'
                                }}
                            >
                                <ListItemText
                                    primary={message.content}
                                    secondary={message.timestamp.toLocaleTimeString()}
                                />
                            </Paper>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Paper>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    multiline
                    maxRows={4}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={isLoading || !newMessage.trim()}
                    sx={{ minWidth: '100px' }}
                >
                    {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                </Button>
            </Box>
        </Box>
    );
}; 