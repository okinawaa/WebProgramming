
import React from 'react'
import styled from 'styled-components'

function SmallestTitle(props) {
    const icon = props.icon;
    const title = props.title
    return (
        <SmallTitleStyled >
            <p>{icon}</p>
            <h3>{title}</h3>
        </SmallTitleStyled >
    )
}

const SmallTitleStyled = styled.div`
    display: flex;
    align-items: center;
    p{
        padding-right: 1rem;
        svg{
            font-size: 1.5rem;
        } 
    }
    h3{
        color: var(--white-color);
        font-size: 1rem;
    }
`;

export default SmallestTitle