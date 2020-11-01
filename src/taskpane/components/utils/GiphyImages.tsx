import {IImageProps, Image, Label, Rating, RatingSize, TextField} from "office-ui-fabric-react";
import {useState} from "react";
import * as React from "react";
import {getTheme} from '@fluentui/react';
import {DefaultEffects, NeutralColors} from "@fluentui/theme";

interface MemeImageProps {
    name: string,
    url: string
}

const GiphyImages = () => {
    const [searchTerm, setSearchTerm] = React.useState('business');
    const [memeImageProps, setMemeImageProps] = useState<MemeImageProps>({
        name: '',
        url: 'http://placehold.it/700x300'
    });

    const theme = getTheme();
    console.log(`theme=${JSON.stringify(theme)}`)
    const styleProps = () => {
        const imageProps: IImageProps = {
            // imageFit: ImageFit.centerContain,
            // width: '100%',
            height: 200,
        };
        return imageProps;
    }

    const getNewMeme = async () => {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=${encodeURIComponent(searchTerm)}`);
        const json = await response.json();
        // setConsole(`meme response= ${response}, json=${JSON.stringify(json)}`)
        const resultsLength = json.data.length;
        if (resultsLength === 0) return;
        const index = Math.floor((Math.random() * resultsLength) + 1)
        const url = json.data[index].images.original.url;
        const name = json.data[index].title;
        setMemeImageProps({name, url});
    };

    return (
        <div style={{
            boxShadow: DefaultEffects.elevation4,
            padding: 15,
            backgroundColor: NeutralColors.white
        }}>
            <Image {...styleProps()}
                   src={memeImageProps.url}
                   alt={memeImageProps.name}
                   onClick={getNewMeme}
            />
            <Label>{memeImageProps.name}</Label>
            <TextField
                label={'Enter search term'}
                onChange={(_ent, newValue) => setSearchTerm(newValue)}
            />
        </div>

    )
}

export default GiphyImages;
