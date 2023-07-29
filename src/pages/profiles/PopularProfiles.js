import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import { axiosReq } from '../../api/axiosDefaults';

import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });
    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    'profiles/?ordering=-followers_count'
                );
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch(err) {
                console.log(err)
            }
        }
        handleMount()
    }, [currentUser]);

    return (
        <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
            {popularProfiles.results.length ? (
                <>
                    <p>Popular Profiles</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results.slice(0,5).map((profile) => (
                                <Profile key={profile.id} profile={profile} mobile />
                            ))}
                        </div>
                    ) : (
                        popularProfiles.results.map((profile) => (
                            <Profile key={profile.id} profile={profile} />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};
    

export default PopularProfiles