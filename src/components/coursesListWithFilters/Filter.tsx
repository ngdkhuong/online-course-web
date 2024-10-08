import styled from 'styled-components';

import PriceFilter from './filter/PriceFilter';
import RatingFilter from './filter/RatingFilter';
import CheckBoxLists from './filter/SubjectFilter';
import { SimpleAccordion } from '../../components';

const FilterContainer = styled.div`
    margin-right: 20px;
`;

const Filter: React.FC = () => {
    const filters = [
        { Section: 'Subject', Component: <CheckBoxLists /> },
        { Section: 'Price', Component: <PriceFilter /> },
        { Section: 'Rating', Component: <RatingFilter /> },
    ];

    return (
        <FilterContainer>
            {filters.map((filter) => (
                <SimpleAccordion key={filter.Section} title={filter.Section}>
                    {filter.Component}
                </SimpleAccordion>
            ))}
        </FilterContainer>
    );
};

export default Filter;
