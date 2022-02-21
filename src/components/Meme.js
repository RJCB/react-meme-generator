import React, { useState } from "react";
let fetchedImages;

const Meme = () => {
    const [meme, setMemeImage] = useState({});
    const fetchMemeImages = async () => {
        if (!fetchedImages) {
            try {
                const fetchImages = await fetch('https://api.imgflip.com/get_memes');
                const images = await fetchImages.json();
                fetchedImages = images.data;
                getMemeImage();
            } catch (err) {
                return err;
            }
        } else {
            getMemeImage();
        }
    }
    const getMemeImage = () => {
        if (fetchedImages) {
            const memes = fetchedImages.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            setMemeImage(randomMeme);
        }
    }
    return (
        <main>
            <div className="form">
                <input type="text" name="text-1" id="text-1" className="text-1" placeholder="Top text" />
                <input type="text" name="text-2" id="text-2" className="text-2" placeholder="Bottom text" />
                <button onClick={fetchMemeImages}>Get a new meme image</button>
            </div>
            <img src={meme.url} alt={meme.name} className="meme-image" />
        </main>
    )
}
export default Meme;