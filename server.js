import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5005;

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_FILE_NAME);
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubRedirectUri = process.env.GITHUB_REDIRECT_URI;

app.use(cors());

const exchangeCodeForAccessToken = async (code) => {
    try {
        const { data } = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: githubClientId,
                client_secret: githubClientSecret,
                code: code,
            },
            {
                headers: { Accept: "application/json" },
            }
        );
        return data.access_token;
    } catch (error) {
        console.error("Error exchanging code for access token:", error);
        throw new Error("Error during GitHub authentication");
    }
};

const fetchGitHubUserDetails = async (accessToken) => {
    try {
        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        console.error("Error fetching GitHub user details:", error);
        throw new Error("Failed to fetch user details");
    }
};

const generateJwtToken = (userData) => {
    const payload = {
        github_id: userData.id,
        username: userData.login,
        avatar_url: userData.avatar_url,
        name: userData.name,
        email: userData.email || null,
        aud: "https://github.com/login/oauth/access_token",
        iss: "https://github.com",
        iat: Math.floor(Date.now() / 1000),
    };

    const expiresIn = '1h';

    return jwt.sign(payload, privateKey, { algorithm: "RS256", keyid: "33c21a45d72adfdc99a20", expiresIn });
};

app.get("/github/login", (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubRedirectUri}`
    );
});

app.get("/github/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const accessToken = await exchangeCodeForAccessToken(code);
        const userData = await fetchGitHubUserDetails(accessToken);
        const jwtToken = generateJwtToken(userData);
        res.json({ token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during GitHub authentication");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
