import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { CountryContext } from '../../../contexts';

const HorizontalLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PriceFilter: React.FC = () => {
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const { currency } = useContext(CountryContext);

    const handleClick = () => {
        searchParams.delete('price[gte]');
        searchParams.delete('price[lte]');
        if (minValue !== '') {
            searchParams.append('price[gte]', minValue);
        }
        if (maxValue !== '') {
            searchParams.append('price[lte]', maxValue);
        }
        setSearchParams(searchParams);
    };

    return (
        <HorizontalLayout>
            <TextField
                style={{ width: '45%', margin: '2px', marginTop: '6px' }}
                label={`min ${currency}`}
                id="outlined-start-adornment"
                type="number"
                onChange={(e) => setMinValue(e.target.value)}
            />
            <TextField
                style={{ width: '45%', margin: '2px', marginTop: '6px' }}
                label={`max ${currency}`}
                id="outlined-start-adornment"
                type="number"
                onChange={(e) => setMaxValue(e.target.value)}
            />
            <Button variant="outlined" size="small" style={{ margin: '2px', marginTop: '6px' }} onClick={handleClick}>
                set
            </Button>
        </HorizontalLayout>
    );
};

export default PriceFilter;
