import ViewProfile from './traineeProfile/ViewProfile';
// import MyCourses from './traineeProfile/MyCourses';
import { CorporateTrainee, IndividualTrainee } from '../types';

const TraineeProfile: React.FC<{
    trainee: CorporateTrainee | IndividualTrainee;
}> = ({ trainee }) => {
    return (
        <>
            <ViewProfile trainee={trainee} />
            {/* <MyCourses /> */}
        </>
    );
};

export default TraineeProfile;
