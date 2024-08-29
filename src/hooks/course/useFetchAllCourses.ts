import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CountryContext } from '../../contexts';
import { useAppDispatch } from '../../redux';
import { getCourseList } from '../../redux';

const useFetchAllCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourseList(searchParams));
    }, [searchParams, country]);
};

export default useFetchAllCourses;
