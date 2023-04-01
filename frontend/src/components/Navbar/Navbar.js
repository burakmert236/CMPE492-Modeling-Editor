import React from "react";
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import OptimizeDropdown from "../OptimizeDropdown/OptimizeDropdown";

import "./Navbar.scss";

const Navbar = ({commandHandlerRef}) => {
    const generateExportLines = (type, index) => {
        return {
            key: `1-${index}`,
            label: (
                <div className="export-type-line">as {type}</div>
            )
        }
    };

    const handleUndo = () => {
        commandHandlerRef.current.undo();
    }
    const handleRedo = () => {
        commandHandlerRef.current.redo();
    }

    return(
        <div className="navbar">
            <div className="navbar-buttons"> 
                <div className="navbar-button logo">LOGO</div>

                <div className="navbar-button">
                    <Dropdown
                        menu={{
                            items: [{
                                key: 1,
                                label: "Export",
                                children: ["jSON", "SVG", "PNG", "STM"].map((abb, index) => generateExportLines(abb, index)),
                            }]
                        }}
                    >
                        <Space>
                            FILE
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>

                <div className="navbar-button">OPTIONS</div>

                <div className="navbar-button">HELP</div>
            </div>

            <div className="right-navbar">
                <div className="redo-undo">
                    <div className="undo" onClick={() => handleUndo()}>
                        <div className="triangle right"></div>
                    </div>
                    <div className="redo" onClick={() => handleRedo()}>
                        <div className="triangle left"></div>
                    </div>
                </div>

                <OptimizeDropdown />
            </div>

        </div>
    );
};

export default Navbar;