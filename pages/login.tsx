import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {useLogin, useUser,} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();

{/* This is where we have a user sign in to our website and then check them for WL TOKEN once they sign in */}
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Thanks for being interested in our mint!</h1>
      <h3>Please check below if you are on WL to mint.</h3>
      <div className="Home_iconContainer1">
        <img src="/4.png" height={300} width={300} alt="SOLANA" />
      </div>
      {!publicKey && <WalletMultiButton />}
      {publicKey && !user && (
        <>
          <h4> Please sign a gasless signetsure to verify your WL token.</h4>
          <button className={styles.button} onClick={() => login()}>
            Check WL status
          </button>
        </>
      )}
      <div>
        <h5 className="footer1">
          Developed with ❤️‍🔥 by:{" "}
          <a href="https://twitter.com/bankkroll_eth">Bankkroll</a>
          &nbsp;-&nbsp;<a href="https://bankkroll.xyz">BR Labs</a>
        </h5>
      </div>
    </div>
  );
};

export default Home;