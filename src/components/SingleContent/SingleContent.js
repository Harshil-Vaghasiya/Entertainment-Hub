import React from 'react';
import { Badge } from "@material-ui/core";
import { img_300, unavailable } from '../../config/Config';
import './SingleContent.css';
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({ id, poster, title, date, type, rating }) => {
    return (
        <ContentModal type={type} id={id}>
            <Badge
                badgeContent={rating}
                color={rating > 6 ? "primary" : "secondary"}
            />
            <img
                className='poster'
                src={poster ? `${img_300}${poster}` : unavailable}
                alt={title}
            />
            <b className="title">{title}</b>
            <span className="subTitle">
                {type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent;

