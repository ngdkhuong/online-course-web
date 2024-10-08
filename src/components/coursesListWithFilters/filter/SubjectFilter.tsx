import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFetchSubjects } from '../../../hooks';
import { useAppSelector } from '../../../redux';

const SubjectsFilter: React.FC = () => {
    const [checked, setChecked] = useState(-1);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useAppSelector((state) => state.subjects);
    useFetchSubjects();

    const handleToggle = (value: string, index: number) => () => {
        searchParams.delete('subject');
        if (checked === index) {
            setChecked(-1);
        } else {
            setChecked(index);
            searchParams.append('subject', value);
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            {data != null && (
                <List>
                    {data.map((subject: string, index: number) => {
                        const labelId: string = `checkbox-list-label-${subject}`;

                        return (
                            <ListItem
                                key={subject}
                                secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(subject, index)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked === index}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${subject}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
};

export default SubjectsFilter;
