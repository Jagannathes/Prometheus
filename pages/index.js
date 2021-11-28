import dynamic from "next/dynamic";
import Link from "next/link";
const { SimplexNoise } = require("simplex-noise");

const DynamicNoise = dynamic(
  () => import("../public/homeNoise.js").then((obj) => {}),
  {
    ssr: false
  }
);

export default function Home() {
  return (
    <>
      <div className="main-container">
        <canvas className="main-canvas"></canvas>
      </div>
      <header className="header">
        <div className="mid">
          <ul className="navbar">
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Market Analyser</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="right">
          <Link href="/login">
            <a>
              <button className="btn">Sign In</button>
            </a>
          </Link>
          <a href="#">
            <button className="btn">Email us</button>
          </a>
        </div>
      </header>
      <h1 className="centreHeading">Prometheus</h1>
      <DynamicNoise />
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Kavoon&display=swap");

        .main-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
        }

        .centreHeading {
          font-family: "Kavoon", cursive;
          font-size: clamp(20px, 20vmin, 7em);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-150%);
          text-shadow: 4px 4px 14px rgba(255, 255, 255, 1);
        }
        .mid {
          /* border: 2px solid green; */

          display: block;
          width: fit-content;
          margin: 7px 0;
          padding: 3px 5px 3px 0px;
          /* display: inline-block; */
        }

        .navbar {
        }

        .navbar li {
          display: inline-block;
        }

        .navbar li a {
          color: white;
          text-decoration: none;
          padding: 34px 23px;
          font-size: 20px;
        }

        .navbar li a:hover,
        .navbar li a.active {
          text-decoration: underline;
          color: rgb(255, 123, 35);
        }

        .right {
          /* border: 2px solid yellow; */
          display: inline-block;
          position: absolute;
          top: 20px;
          right: 10px;
        }

        .btn {
          font-size: 15px;
          font-family: "Montserrat", sans-serif;
          margin: 0px 9px;
          background-color: black;
          color: white;
          border: none;
          padding: 7px 7px;

          border: 2px solid rgb(37, 37, 37);
          border-radius: 10px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: rgb(88, 88, 88);
        }

        /* Container styles */
        .container {
          border: 3px solid white;
          width: 38%;
          margin: 80px 81px;
          padding: 15px 2px;
          border-radius: 19px;
          text-align: center;

          background-color: rgba(0, 0, 0, 80%);
          opacity: 80%;
        }

        .container:hover {
          box-shadow: 0px 0px 5px 1px #888;
        }

        .container h3 {
          margin: 20px auto;
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
}
