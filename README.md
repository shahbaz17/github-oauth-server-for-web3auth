# GitHub OAuth Server for Web3Auth

This project is a demonstration of integrating Web3Auth with GitHub OAuth for authentication. Web3Auth is a decentralized authentication protocol that allows users to sign in to applications using their Ethereum wallets. In this demo, GitHub OAuth is used to authenticate users, and Web3Auth is employed to provide Ethereum private key access.

## Features

- GitHub OAuth integration for user authentication.
- Web3Auth integration for Ethereum private key access.
- Generates a JSON Web Token (JWT) containing GitHub user information.
- Provides Ethereum private key and public address associated with the authenticated GitHub user.
- Demonstrates the exchange of GitHub OAuth code for an access token.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/shahbaz17/github-oauth-server-for-web3auth.git
   ```

2. Install dependencies:

   ```bash
   cd github-oauth-server-for-web3auth
   npm install
   ```

3. Create a `.env` file in the project root and set the following variables:

   ```env
   PRIVATE_KEY_FILE_NAME=filename.extension
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GITHUB_REDIRECT_URI=http://localhost:5005/github/callback
   ```

   Replace `your-github-client-id` and `your-github-client-secret` with your GitHub OAuth application credentials.

4. Run the application:

   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:5005/github/login](http://localhost:5005/github/login) to initiate the GitHub OAuth flow.

## Dependencies

- @web3auth/node-sdk
- @web3auth/ethereum-provider
- jsonwebtoken
- express
- cors
- axios
- dotenv

## Configuration

Ensure that you have a valid Ethereum private key in the specified file path and set up a GitHub OAuth application with the provided client ID, client secret, and redirect URI.
