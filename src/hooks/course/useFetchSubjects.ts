import { useEffect } from 'react';

import { useAppDispatch, getSubjects } from '../../redux';

const useFetchSubjects = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getSubjects());
    }, []);
};

export default useFetchSubjects;
