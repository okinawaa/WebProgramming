import React, {useEffect} from 'react'
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import ReviewItem from '../Components/ReviewItem';
import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import {upDownStaggerElement} from "./Animation";
gsap.registerPlugin(ScrollTrigger);

function ReviewsSetion() {

    useEffect(() => {
        upDownStaggerElement(-50,document.querySelector('.reviews').childNodes,document.querySelector('.reviews'))
    }, [])

    return (
        <ReviewsStyled>
            <Title title={'Reviews'} span={'Reviews'} />
            <InnerLayout>
                <div className="reviews">
                    <ReviewItem
                        text={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt culpa ad itaque quas?'}
                    />
                    <ReviewItem
                        text={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt culpa ad itaque quas? Dos ir por culpa ad itaque quas!'}
                    />

                </div>
            </InnerLayout>
        </ReviewsStyled>
    )
}

const ReviewsStyled = styled.section`
    .reviews{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5rem;
        width: 100%;
        @media screen and (max-width:650px){
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;

export default ReviewsSetion;