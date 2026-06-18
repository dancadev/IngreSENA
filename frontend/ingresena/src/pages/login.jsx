import "../styles/login.css";
import { Link } from "react-router-dom";
import logoSena from "../assets/logoSena.png";
import imgAlusiva from "../assets/imgAlusiva.webp";

function Login() {

    return (

        <div className="login-container">

            <div className="content1">
                <div className="logoSena">
                    <img className="iconSena" src={logoSena} alt="LogoSENA" />
                </div>
                <br />
                <div className="imgAlusiva">
                    <img className="imgLogin" src={imgAlusiva} alt="imgAlusiva" />
                </div>
            </div>

            <div className="content2">
                <main className="content2_1">
                    <h1>IngreSENA</h1>

                    <input
                        type="text"
                        placeholder="Usuario"
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Contraseña"
                    />
                    <br />
                    <Link to="/inicio">
                        <button>Ingresar</button>
                    </Link>
                </main>
            </div>

        </div>
    );
}

export default Login;