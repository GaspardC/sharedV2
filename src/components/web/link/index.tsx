import React from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

export const CustomLink = ({label, path, onClick} : {label: string, path: string, onClick?: any}) => {
    return (
        <Link to={path} onClick={onClick}><LinkText>{label}</LinkText></Link>
    );
}

export const LinkText = styled.span`
    text-decoration: underline;
`