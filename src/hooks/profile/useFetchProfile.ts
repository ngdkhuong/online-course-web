import { useEffect } from 'react';

import { useAuth } from '../../hooks';
import { getProfile, useAppDispatch } from '../../redux';
import { User } from '../../types';

const useFetchProfile = () => {
    const dispatch = useAppDispatch();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.userType !== User.GUEST && auth.accessToken !== null) {
            dispatch(getProfile(auth.accessToken));
        }
    }, []);
};

export default useFetchProfile;
