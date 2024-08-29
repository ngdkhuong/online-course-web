/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import logo from '../assets/logo-white.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { User } from '../types';
import { useAppSelector } from '../redux/store';
import Avatar from './Avatar';
import OptionsButton from './OptionsButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../services/auth';
import './navbar/Navbar.css';
import Flag from 'react-world-flags';
import { useAuth, useFetchProfile } from '../hooks';
import { config } from '../config/config';
import { CountryContext } from '../contexts';
import CountrySelect from './navbar/CountrySelect';
import countries from '../media/country-currency.json';

const Image = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
`;

const getUserName = (userType: User, data: any) => {
    const userMap: { [key in User]?: string } = {
        [User.INSTRUCTOR]: 'instructor',
        [User.INDIVIDUAL_TRAINEE]: 'individualTrainee',
        [User.CORPORATE_TRAINEE]: 'corporateTrainee',
    };

    const userKey = userMap[userType];
    if (userKey && data?.[userKey]) {
        return `${data[userKey]?.firstName || ''} ${data[userKey]?.lastName || ''}`.trim();
    }

    return '';
};

const Navbar: React.FC<{ search?: boolean }> = ({ search = false }) => {
    const { auth, logout: authLogout } = useAuth();

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useAppSelector((state) => state.profile);
    const { country, setCountry } = useContext(CountryContext);

    useFetchProfile();

    const options = [
        {
            label: 'Profile',
            onClick: () => navigate('/me/profile'),
            icon: <AccountCircleIcon />,
        },

        {
            label: 'Reports',
            onClick: () => navigate('/me/reports'),
            icon: <BugReportIcon />,
        },
        {
            label: 'Change Password',
            onClick: () => navigate('/auth/change'),
            icon: <ChangeCircleIcon />,
        },
        {
            label: 'Logout',
            onClick: () => {
                logout().then(() => {
                    authLogout();
                    navigate('/', { replace: true });
                });
            },
            icon: <LogoutIcon />,
        },
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (value: string) => {
        setOpen(false);
        setCountry(value || 'us');
        fetch(`${config.API_URL}/country/${value || 'us'}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Image src={logo} alt="logo" onClick={() => navigate('/')} className="logo" />
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                        <li className="nav-item">
                            <Link className="nav-link all-courses" to="/">
                                All Courses
                            </Link>
                        </li>
                        {search && (
                            <li className="search-container container-fluid flex-fill">
                                <button className="search-button" type="button">
                                    <img
                                        className="search-button-img"
                                        src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
                                        alt="search icon"
                                        onClick={() => {
                                            searchParams.delete('searchTerm');
                                            if (searchTerm.length !== 0) {
                                                searchParams.append('searchTerm', searchTerm);
                                            }
                                            setSearchParams(searchParams);
                                        }}
                                    />
                                </button>
                                <input
                                    id="search-box"
                                    className="search-box"
                                    type="text"
                                    placeholder="Search for anything"
                                    aria-label="Search"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                />
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav buttons-list">
                        {auth.userType !== User.GUEST && (
                            <li className="nav-item">
                                <Link className="nav-link all-courses" to="/me/courses">
                                    My Courses
                                </Link>
                            </li>
                        )}
                        {auth.userType === User.GUEST && (
                            <>
                                <button className="navbar-item login-button" onClick={() => navigate('/auth/login')}>
                                    Log In
                                </button>
                                <button
                                    className="navbar-item signup-button"
                                    onClick={() => navigate('/auth/register')}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}

                        <button className="navbar-item language-button" onClick={handleClickOpen}>
                            <Flag
                                code={country}
                                fallback={
                                    <img
                                        className="language-img"
                                        src="https://img.icons8.com/material-outlined/344/globe--v2.png"
                                        alt="language icon"
                                    />
                                }
                            />
                        </button>
                        {auth.userType !== User.GUEST && data && (
                            <div className="navbar-item">
                                <OptionsButton
                                    options={options}
                                    icon={<Avatar name={getUserName(auth.userType, data)} />}
                                />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            <CountrySelect selectedValue={country} open={open} onClose={handleClose} countries={countries} />
        </nav>
    );
};

export default Navbar;
