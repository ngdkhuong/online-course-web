import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Flag from 'react-world-flags';

import { CountryContext } from '../../contexts';
import { Country } from '../../types';

export interface CountrySelectProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    countries: Country[];
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    open,
    onClose,
    selectedValue,
    countries,
}: CountrySelectProps) => {
    const { setCurrency } = React.useContext(CountryContext);
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string, currency: string) => {
        onClose(value);
        setCurrency(currency);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Please Select Your Country</DialogTitle>
            <DialogContent style={{ height: '600px', width: '600px' }}>
                <List sx={{ pt: 0 }}>
                    {countries.map((country) => (
                        <ListItem
                            component="button"
                            onClick={() => handleListItemClick(country.CountryCode, country.Code)}
                            key={country.Country}
                        >
                            <Flag
                                code={country.CountryCode}
                                style={{ height: '25px', width: '25px', padding: '5px' }}
                            />

                            <ListItemText primary={country.Country} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CountrySelect;
