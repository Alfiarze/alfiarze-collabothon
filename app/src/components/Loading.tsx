import { CircularProgress } from "@mui/material";
import logo from "../assets/images/logo.png";

const Loading = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}>
            <img src={logo} alt="logo" style={{ marginBottom: '20px', width: '100px' }} />
            <CircularProgress size={60} />
        </div>
    )
}

export default Loading;
