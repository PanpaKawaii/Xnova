import React, { useEffect, useRef, useState } from 'react';
import './ChatBox.css';

export default function ChatBox() {

    const [Messages, setMessages] = useState([]);
    const [WidthFull, setWidthFull] = useState(false);
    const [HeightFull, setHeightFull] = useState(false);
    const [DisplayChat, setDisplayChat] = useState(false);
    // const handleSetHeight = (status) => {
    //     setHeightFull(p => status);
    // }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addMessage = async (newMessage) => {

        console.log('newMessage: ', newMessage);

        const SendMessage = {
            message: newMessage,
        };

        const fetchData = async () => {
            setLoading(p => true);

            try {
                const answerResponse = await fetch('https://localhost:7166/api/Chat/ask',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuZ3V5ZW52YW5hbkBnbWFpbC5jb20iLCJqdGkiOiI0OWQ2YjMyOC1iN2ZjLTQyYjgtODFhOS1kN2I3MTdlMjk3ZDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzUxMTI4ODY0LCJpc3MiOiJQb2RCb29raW5nIiwiYXVkIjoiUG9kV2ViIn0.05uZfimQVJtRXJErhq2SUwRAc-pzoOl5JtXikxwlZ6o`
                        },
                        body: JSON.stringify(SendMessage),
                    }
                );
                if (!answerResponse.ok) throw new Error('Network response was not ok');
                const answerData = await answerResponse.json();
                setMessages((prev) => [...prev, answerData.reply]);

                console.log('answerData:', answerData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [Messages]);

    const addMyMessage = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (e.target.chat.value && loading === false) {
            addMyMessage(e.target.chat.value);
            addMessage(e.target.chat.value);
            e.target.chat.value = '';
        }
    }

    const StyleNormal = {
        width: '360px',
        height: '440px',
    }

    const StyleHeight = {
        width: '360px',
        height: '90vh',
    }

    const StyleFull = {
        width: 'calc(100% - 16px)',
        height: '90vh',
    }

    return (
        <div className='chat-box-container'>

            {/* <div>HeightFull: {HeightFull ? 'TRUE' : 'FALSE'}</div>
            <div>DisplayChat: {DisplayChat ? 'TRUE' : 'FALSE'}</div> */}

            {!DisplayChat &&
                <div className='open-icon' onClick={() => setDisplayChat(true)}>
                    Xnova
                </div>
            }

            {DisplayChat &&
                <div className='chat-box' style={WidthFull ? StyleFull : (HeightFull ? StyleHeight : StyleNormal)}>

                    <div className='heading'>
                        <div className='name'>Xnova {Messages.length}</div>
                        <div>
                            {WidthFull ?
                                <i className='fa-solid fa-minimize' onClick={() => setWidthFull(false)}></i>
                                :
                                <i className='fa-solid fa-maximize' onClick={() => setWidthFull(true)}></i>
                            }
                            {HeightFull ?
                                <i className='fa-solid fa-arrow-down' onClick={() => setHeightFull(false)}></i>
                                :
                                <i className='fa-solid fa-arrows-up-down' onClick={() => setHeightFull(true)}></i>
                            }
                            <i className='fa-solid fa-xmark' onClick={() => setDisplayChat(false)}></i>
                        </div>
                    </div>

                    <div
                        ref={chatContainerRef}
                        className='chat-content'
                    >
                        {Messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className='message'
                                style={{
                                    alignSelf: idx % 2 === 0 ? 'flex-end' : 'flex-start',
                                }}
                            >
                                {msg}
                            </div>
                        ))}
                        {loading && <div
                            className='message'
                            style={{ alignSelf: 'flex-start' }}
                        >
                            ...
                        </div>}
                    </div>

                    <form onSubmit={handleSend}>
                        <div className='form-name form-group'>
                            <input type='text' id='chat' name='chat' placeholder='Chat here' />
                        </div>
                        <button className='btn'>Send</button>
                    </form>

                </div>
            }
        </div>
    )
}
