"use client"

import { IoChatbubbleOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi2";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import  DiscussionSection  from "./discussion-section";
import PromptSection from "./prompt-section";

interface SidebarProps {
    children: React.ReactNode
}
interface SavedChat {
    fileName: string;
    messages: string[];
    status: 'active' | 'saved';
}
interface ChatSession {
    fileName: string;
    messages: any[];
    status: 'active' | 'saved';
}

const Sidebar: React.FC<SidebarProps> = ({ 
    children, 
}) => {
    const [currentChat, setCurrentChat] = useState({
        fileName: `chat_${new Date().toISOString().replace(/[:.-]/g, '')}.json`,
        messages: [],
        status: 'active'
    });

    const [savedChats, setSavedChats] = useState<SavedChat[]>([]);

    const saveCurrentChat = () => {
        if (currentChat.status === 'active') {
            const savedChat: ChatSession = { ...currentChat, status: 'saved' };
            setSavedChats(prevChats => [...prevChats, savedChat]);
            console.log('Current chat saved:', savedChat);
        }
    };
    const createNewChat = () => {
        // Save the current chat before starting a new one
        saveCurrentChat();

        // Create a new chat session with a new filename
        const newChat = {
            fileName: `chat_${new Date().toISOString().replace(/[:.-]/g, '')}.json`,
            messages: [],
            status: 'active'
        };
        setCurrentChat(newChat);
        console.log('New chat created:', newChat);
    };
    return ( 
        <div className="flex h-full m-2 gap-x-4">
            <nav className="flex flex-col justify-between items-center w-[250px] bg-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex gap-x-2 gap-y-4 flex-col w-full">
                    <Button className="bg-white flex rounded-full drop-shadow-md hover:bg-slate-300 gap-x-4">
                        <IoChatbubbleOutline size="20"/>
                        <span>Nouveau Chat</span>
                    </Button>
                    <Button className="bg-white rounded-full drop-shadow-md hover:bg-slate-300 gap-x-4" >
                        <HiOutlineUserGroup size="20" />
                        <span>Nos conseillers</span>
                    </Button>
                </div>
                <Button className="bg-white flex rounded-full drop-shadow-md border-none w-full hover:bg-slate-300 gap-x-4">
                    <RxExit size="15" rotate="180" />
                    <span>Loggout</span>
                </Button>
            </nav>
            <main className="bg-slate-200 flex-1 h-full w-full rounded-xl overflow-y-auto py-2">
                {children}
                <DiscussionSection />
                <PromptSection />
            </main>
        </div>
    );
}

export default Sidebar;
