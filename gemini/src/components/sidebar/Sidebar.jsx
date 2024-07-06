import React, { useState, useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import React Icons
import Modal from '../Modal/Modal'; // Import the Modal component
import './sidebar.css';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
    const { isDark, toggleTheme } = useTheme();

    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Inline style for the theme toggle button
    const themeToggleStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        cursor: 'pointer',
        color: isDark ? '#fff' : '#000',
        backgroundColor: isDark ? '#333' : '#f0f4f9',
    };

    // Inline style for the sidebar items without borders
    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        cursor: 'pointer',
        color: isDark ? '#fff' : '#000',
        border: 'none',
    };

    // Inline style for sidebar width based on extended state
    const sidebarStyle = {
        width: extended ? '250px' : '70px', // Adjust width as needed
        transition: 'width 0.3s ease', // Smooth transition for expanding/shrinking
    };

    return (
        <div className={`sidebar ${isDark ? 'dark-theme' : 'light-theme'}`} style={sidebarStyle}>
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => setExtended((prev) => !prev)}
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" onClick={newChat} />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => loadPreviousPrompt(item)}
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry" style={itemStyle} onClick={openModal}>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry" style={themeToggleStyle} onClick={toggleTheme}>
                    {isDark ? (
                        <>
                            <FaSun size={20} />
                            {extended && <p>Light Mode</p>}
                        </>
                    ) : (
                        <>
                            <FaMoon size={20} />
                            {extended && <p>Dark Mode</p>}
                        </>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Help</h2>
                <p>Here is some help content. Describe how the app works or provide useful tips.</p>
                <p>For example, explain how to use the Crypto Tracker, navigate through the sidebar, etc.</p>
            </Modal>
        </div>
    );
};

export default Sidebar;
