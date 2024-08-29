/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="white" align="center" {...props}>
            {'Copyright © '}
            <Link
                color="#0066FF"
                to="/"
                style={{
                    color: '#0066FF',
                }}
            >
                KUONDEV
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
