import React, {useEffect, useState} from 'react';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import Menu from '../Components/Menu';
import axios from "axios";


function PortfoliosPage() {
    const [portfolios,setPortfolios] = useState([]);
    useEffect(() => {
        const getPortfolios = async () => {
            const dbPortfolios = await axios.get('/api/portfolio/')
            setPortfolios(dbPortfolios.data)
        }
        getPortfolios();
    }, [])


    return (
        <MainLayout>
            <Title title={'Portfolios'} span={'portfolios'} />
            <InnerLayout>
                <Menu portfolios={portfolios} />
            </InnerLayout>
        </MainLayout>
    )
}

export default PortfoliosPage