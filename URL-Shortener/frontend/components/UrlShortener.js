import React, { useState } from 'react';
import axios from 'axios';
const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const handleSubmit = async () => {
        const res = await axios.post('/api/url/shorten', { longUrl });
        setShortUrl(res.data.shortUrl);
    };
    return (
        <div>
            <input value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter URL" />
            <button onClick={handleSubmit}>Shorten</button>
            {shortUrl && <p>Short URL: {shortUrl}</p>}
        </div>
    );
};
export default UrlShortener;