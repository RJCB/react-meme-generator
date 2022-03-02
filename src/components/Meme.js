import React, { useState, useEffect } from "react";
// let fetchedMemes;

const Meme = () => {
    const [meme, setMemeImage] = useState({});
    const [{ topText, bottomText }, setInputValues] = useState({ topText: "", bottomText: "" });
    const [fetchedMemes, setFetchedMemes] = useState([]);
    // const fetchMemeImages = async () => {
    //     if (!fetchedMemes) {
    //         try {
    //             const fetchImages = await fetch('https://api.imgflip.com/get_memes');
    //             const images = await fetchImages.json();
    //             fetchedMemes = images.data;
    //             getMemeImage();
    //         } catch (err) {
    //             return err;
    //         }
    //     } else {
    //         getMemeImage();
    //     }
    // }

    useEffect(() => {
        const fetchMemeImages = async () => {
            try {
                const fetchImages = await fetch('https://api.imgflip.com/get_memes');
                const data = await fetchImages.json();
                setFetchedMemes(data.data.memes);
            } catch (err) {
                return err;
            }
        }
        fetchMemeImages();
    }, [])

    const getMemeImage = () => {
        const memes = fetchedMemes;
        if (memes.length > 0) {
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            setMemeImage(randomMeme);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevValues => {
            return { ...prevValues, [name]: value }
        })
    }
    return (
        <main>
            <div className="form">
                <input type="text" name="topText" id="topText" value={topText} className="top-text" onChange={handleChange} placeholder="Top text" />
                <input type="text" name="bottomText" id="bottomText" value={bottomText} className="bottom-text" onChange={handleChange} placeholder="Bottom text" />
                <button onClick={getMemeImage}>Get a new meme image</button>
            </div>
            {meme.url &&
                <div className="meme-section">
                    <img src={meme.url} alt={meme.name} className="meme-image" />
                    <h2 className="top-header-text">{topText}</h2>
                    <h2 className="bottom-header-text">{bottomText}</h2>
                </div>
            }
        </main>
    )
}
export default Meme;