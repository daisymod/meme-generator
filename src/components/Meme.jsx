import { useState, useEffect } from "react"
// import memesData from "../memesData.js"

export default function Meme(){
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })

    // const [allMemes, setAllMemes] = useState(memesData)
    const [allMemes, setAllMemes] = useState([])
    /** API call to "https://api.imgflip.com/get_memes". */
    // useEffect(function() {
    //     console.log("Effect ran")
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemes(data.data.memes))
    // }, [])

    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    useEffect(() => {
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        } 
        getMemes()
    }, [])

    
    function getMemeImg(){
        // const memesArr = allMemes.data.memes
        const randNum = Math.floor(Math.random() * allMemes.length)
        let url = allMemes[randNum].url
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImg: url,
            }
        })
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]:value,
            }
        })
    }

    return(
        <main>
            <div className="form">
                <div className="form--inputs">
                    <label htmlFor="topText">Top text</label>
                    <input 
                        className="form--input" 
                        id="topText" 
                        type="text" 
                        placeholder="Shut up"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </div>
                <div className="form--inputs">
                    <label htmlFor="bottomText">Bottom text</label>
                    <input 
                        className="form--input" 
                        id="bottomText" 
                        type="text" 
                        placeholder="And take my money"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button className="form--btn" onClick={getMemeImg}>Get a new meme image  🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImg} className="meme--img" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
       
    )
}