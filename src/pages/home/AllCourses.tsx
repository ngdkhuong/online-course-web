import { CoursesListWithFilters } from '../../components';
import { useFetchAllCourses } from '../../hooks';
import { useAppSelector } from '../../redux';

const AllCourses = () => {
    useFetchAllCourses();
    const { data } = useAppSelector((state) => state.coursesList);
    return <div>{data && <CoursesListWithFilters courses={data} showStatus={false} showPrice={false} />}</div>;
};

export default AllCourses;
