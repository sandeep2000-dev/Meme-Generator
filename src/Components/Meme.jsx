import React from 'react';

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "", 
        bottomText: "", 
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect( () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []);

    function getMemeImage() {
        const rand = Math.floor(Math.random() * allMemes.length);
        setMeme( (prevMeme) => {
            return {
                ...prevMeme,
                randomImage: allMemes[rand].url
            }
        });
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme( (prevMeme) => {
            return ({
                ...prevMeme,
                [name]: value
            });
        })
    }

    return (
        <div className="main">
            <div className="form--input">
                <input 
                    placeholder="Top text" 
                    type="text"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                <input 
                    placeholder="Bottom text" 
                    type="text"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                 />
            </div>
            <button onClick={getMemeImage}>Get a new meme Image</button>
            <div className="meme">
                <img src={meme.randomImage} alt="meme" />
                <h1 className="meme--text-top">{meme.topText}</h1>
                <h1 className="meme--text-bottom">{meme.bottomText}</h1>
            </div>
        </div>
    );
}
