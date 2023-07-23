import axios from "axios";
import { useState, useEffect } from "react";
// Import logo
import iconCompany from "../assets/icon-company.svg";
import iconLocation from "../assets/icon-location.svg";
import iconMoon from "../assets/icon-moon.svg";
import iconSearch from "../assets/icon-search.svg";
import iconSun from "../assets/icon-sun.svg";
import iconTwitter from "../assets/icon-twitter.svg";
import iconWebsite from "../assets/icon-website.svg";
import avatar from "../assets/Bitmap.svg";

function Header() {
  // https://api.github.com/users/

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const [modeName, setModeName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    setModeName(isDarkMode ? "DARK" : "LIGHT");
  }, []);

  

  useEffect(() => {
    // Dark mode durumuna göre body etiketine CSS class ekleme/kaldırma
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Dark mode durumunu local storage'a kaydetme
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    setModeName((prevModeName) => (prevModeName === "LIGHT" ? "DARK" : "LIGHT"));
    localStorage.setItem("darkMode", !darkMode);
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        ` https://api.github.com/users/${value}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("hata olustu:", error);
    }
  };

  return (
    <div className="header">
      <div className="upper-container">
        <div className="logo">
          <h1>devfinder</h1>
        </div>
        <div className="dark-mode">
          <span className="mode-name">{modeName}</span>
          <button onClick={toggleDarkMode} className="mode-btn">
          <img src={darkMode ? iconSun : iconMoon} alt={darkMode ? "iconSun" : "iconMoon"} />
          </button>
        </div>
      </div>

      <div className="input-container">
        <img className="search-icon" src={iconSearch} alt="search" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search GitHub username..."
        />
        <button onClick={fetchData} className="search-btn">
          Search
        </button>
      </div>

      <div className="content-container">
        <div className="content">
          <div className="avatar">
            {userData === "" && <img src={avatar} alt="avatar" />}
            {userData !== "" && <img src={userData.avatar_url} alt="avatar" />}
          </div>

          <div className="right-container">
            <div className="author-info">
              <div className="author-name">
                <h3>{userData?.name ?? "The Octocat"}</h3>
                <span className="nickname">
                  @{userData?.login ?? "octocat"}
                </span>
              </div>
              <h6 className="date">
                Joined{" "}
                {formatDate(userData?.created_at ?? "Joined 25 Jan 2011")}
              </h6>
            </div>

            <div className="author-content">
              <p>
                {userData?.bio ??
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donecodio. Quisque volutpat mattis eros."}
              </p>
            </div>

            <div className="author-followers">
              <div className="repos">
                <h4>Repos</h4>
                <p>{userData?.public_repos ?? "8"}</p>
              </div>
              <div className="followers">
                <h4>Followers</h4>
                <p>{userData?.followers ?? "3938"}</p>
              </div>
              <div className="following">
                <h4>Following</h4>
                <p>{userData?.following ?? "9"}</p>
              </div>
            </div>

            <div className="logo-info">
              <div className="row">
                <div>
                  <img src={iconLocation} alt="icon" />
            <p>{userData?.location ?? 'Not Available'}</p>
                </div>
                <div>
                  <img src={iconWebsite} alt="icon" />
                  <a>{userData?.blog ?? 'Not Available'}</a>
                </div>
              </div>

              <div className="row">
                <div>
                  <img src={iconTwitter} alt="icon" />
                  <a>{userData?.twitter_username ?? 'Not Available'}</a>
                </div>
                <div>
                  <img src={iconCompany} alt="icon" />
                  <a href={`https://github.com/${userData.login}`}>@{userData.login}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
