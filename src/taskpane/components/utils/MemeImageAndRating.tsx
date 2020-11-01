import {IImageProps, Image, Label, Rating, RatingSize} from "office-ui-fabric-react";
import {useState} from "react";
import * as React from "react";

interface MemeImageProps {
    name: string,
    url: string
}

const MemeImageAndRating = () => {
    const [largeStarRating, setLargeStarsRating] = React.useState(1);
    const [memeImageProps, setMemeImageProps] = useState<MemeImageProps>({
        name: '',
        url: 'http://placehold.it/700x300'
    });

    const styleProps = () => {
        const imageProps: IImageProps = {
            // imageFit: ImageFit.centerContain,
            // width: '100%',
            height: 200,
        };
        return imageProps;
    }

    const getNewMeme = async () => {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const json = await response.json();
        // setConsole(`meme response= ${response}, json=${JSON.stringify(json)}`)
        const index = Math.floor((Math.random() * json.data.memes.length) + 1)
        const {name, url} = json.data.memes[index]
        setMemeImageProps({name, url});
    };

    return (
        <div>
            <Image {...styleProps()}
                   src={memeImageProps.url}
                   alt={memeImageProps.name}
                   onClick={getNewMeme}
            />
            <Label>{memeImageProps.name}</Label>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Label>Rate this meeting</Label>
            <Rating
                min={1}
                max={5}
                size={RatingSize.Large}
                rating={largeStarRating}
                onChange={(_ev, rating) => setLargeStarsRating(rating)}
                ariaLabelFormat={'Select {0} of {1} stars'}
            />
        </div>

    )
}

export default MemeImageAndRating;
