import React, {FC, useEffect, useReducer, useState} from 'react';
import Btn from "../ui/Btn";
import "./css/Chat.css"
import Input from "../ui/Input";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../redux";
import {setChatId} from "../redux/activeChatSlice";
import Calendar from "./Calendar";
import {getContact, getResume, getUserById, getVacancy, sendMessage} from "../api/Api";
import {IMessage, IResume, IUser, IVacancy} from "../types/types";

interface IChat {
    onBack?: () => void,
}

const Chat: FC<IChat> = ({onBack}) => {
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()
    // @ts-ignore
    const chatId = useSelector(state => state.activeChat.id)
    const [chooseTime, setChooseTime] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>()
    // @ts-ignore
    const user = useSelector(state => state.user)

    useEffect(() => {
        getContact(chatId).then(val => {
            setMessages(val.messages)
            })
    }, [])

    return (
        <div className="chat">
            {chatId !== -1
                ? <>
                    <div className="head">
                        <div className="back">
                            <Btn text={"Назад"} onClick={() => {
                                dispatch(setChatId(-1))
                                if (onBack) {
                                    onBack()
                                }
                            }}/>
                        </div>
                        <div className="chat-info"><p>Название</p></div>
                        <Btn className="profile-btn" text={"Профиль"} onClick={() => {
                        }}/>
                        <Btn className="delete-btn" text={"Удалить"} onClick={() => {
                        }}/>
                    </div>
                    <div className="messages">
                        {messages && messages.map(m =>
                            <div className={m.userIdFrom == user.id ? "my" : "other"}>{m.message}</div>
                        )}
                        {/*<div className="choose-time">*/}
                        {/*    <Btn text={"Выбрать время собеседования"} onClick={() => {*/}
                        {/*    }}/>*/}
                        {/*    <Calendar/>*/}
                        {/*</div>*/}
                    </div>
                    <div className="input-field">
                        <Input text={"Сообщение"} value={msg} setValue={setMsg}/>
                        <Btn style={{marginBottom: "20px"}} text={"отправить"} onClick={() => {
                            sendMessage(chatId, msg).then()
                        }}/>
                    </div>

                </>
                : <></>
            }
        </div>
    );
};

export default Chat;