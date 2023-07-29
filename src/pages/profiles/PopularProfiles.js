import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import { axiosReq } from '../../api/axiosDefaults';

const PopularProfiles = () => {
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
        <Container className={appStyles.Content}>
            {popularProfiles.results.length ? (
                <>
                    <p>Popular Profiles</p>
                    {popularProfiles.results.map((profile) => (
                        <p key={profile.id}>{profile.owner}</p>
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles