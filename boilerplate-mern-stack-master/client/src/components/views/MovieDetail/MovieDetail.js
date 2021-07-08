import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import {Row} from "antd";

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            })
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);

            })
    }, [])


    function toggleActorView() {
        setActorToggle(!ActorToggle);
    }

    return (
        <div>
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                       title={Movie.original_title}
                       text={Movie.overview}/>
            }

            <div style={{width: '85%', margin: '1rem auto'}}>

                <MovieInfo movie={Movie}></MovieInfo>
                <br/>


                <div style={{display: "flex", justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle &&
                <Row gutter={[24, 24]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null
                                }
                                characterName={cast.name}
                            />

                        </React.Fragment>
                    ))}
                </Row>}

            </div>
        </div>
    );
}

export default MovieDetail;
