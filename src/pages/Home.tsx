import React from 'react';

// import AllCourses from './home/AllCourses';
import { Navbar } from '../components';

const Home: React.FC = () => {
    return (
        <>
            <Navbar search={true} />
            {/* <AllCourses /> */}
        </>
    );
};

export default Home;
