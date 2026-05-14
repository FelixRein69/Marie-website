export default function SpotifyEmbed() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 className="h2-warum">Das lied bei dem ich dir den Antrag gemacht hab</h2>

            <div style={{ display: "flex", justifyContent: "center" }}>

                <iframe
                    title="spotify-track"
                    style={{ borderRadius: "12px", }}
                    src="https://open.spotify.com/embed/track/3pRaLNL3b8x5uBOcsgvdqM?utm_source=generator"
                    width="60%"
                    height="200"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </div>
        </div>
    );
}