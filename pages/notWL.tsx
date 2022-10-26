import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {useLogin, useUser,} from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { user } = useUser();
  const login = useLogin();

{/* This is where we display not eligible for WL since they dont hold a token */}
{/* We also display a login button to recheck the connected wallet for WL token */}
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Thanks for being interested in our mint!</h1>
      <h3></h3>
      <div className="Home_iconContainer1">
        <img src="/5.png" height={360} width={400} alt="SOLANA" />
      </div>
      <h2>Unfortunately your not eligble to mint on our WL phase.</h2>
      <h3>Please try again later, or re-check your status below.</h3> 

{/* Here we ask to see if user is connected, if true then we show recheck WL TOKEN, if false we show connect wallet then recheck */}
      {!publicKey && user && <WalletMultiButton />}
      {publicKey && user && (<button className={styles.button} onClick={() => login()}>
        Re-check WL status
      </button>)}

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
