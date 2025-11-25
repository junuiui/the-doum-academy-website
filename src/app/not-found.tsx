export default function NotFoundPage() {
    return (
        <div style={{
            width: "100%",
            padding: "80px 20px",
            textAlign: "center"
        }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                Page Not Found
            </h1>
            <p style={{ marginBottom: "20px" }}>
                The page you're looking for doesn't exist.
            </p>
            <a href="/" style={{
                color: "blue",
                textDecoration: "underline",
                fontSize: "18px"
            }}>
                Go back home
            </a>
        </div>
    );
}
