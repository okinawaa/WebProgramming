import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Button} from "antd";

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
        userFrom:userFrom,
        movieId:movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRunTime:movieRunTime,

    }
    useEffect(() => {


        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])


    function onClickFavorite() {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(false);
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패하였습니다')

                    }
                })

        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response =>{
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber +1);
                        setFavorited(true);

                    } else {

                        alert('Favorite 리스트에 추가하는데 실패하였습니다')
                    }
                })

        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
            </Button>
        </div>
    );
}

export default Favorite;