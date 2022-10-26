import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { programAddress } from "../const/yourDetails";
import {useClaimNFT, useLogin, useProgram, useUser,} from "@thirdweb-dev/react/solana";
import styles from "../styles/Home.module.css";
import swal from "sweetalert";

{/* This is where your user will see a minting page if they hold a WL token */}
const Protected = () => {
  const { user } = useUser();
  const login = useLogin();
  const program = useProgram("Ca4TBou77k6otCwq6WKsn9V17LFsKcMjkMqXF9GiWa19","nft-drop");
  const { mutate, isLoading } = useClaimNFT(program.data);
  const claim = useClaimNFT(program.data);
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img src="/3.png" height={290} width={520} alt="BR Labs" />
      </div>
      <h1 className={styles.h1}>Congrats! You are eligible for WL mint </h1>
      <div className={styles.explain}>
        {" "}
        Wanna check out more of my services and projects? →{" "}
        <a href="https://bankkroll.xyz">bankkroll.xyz</a>{" "}
      </div>
      <div className={styles.explain}>
        {" "}
        or contact me here →{" "}
        <a href="https://twitter.com/bankkroll_eth">Bankkroll</a>{" "}
      </div>

      {user && (
        <button
          onClick={() =>
            mutate(
              { amount: 1 },
              {
                onSuccess: (Success) => {
                  console.log(Success);
                  swal("Mint Successful", "You minted 1 NFT!", "success");
                },
                onError: (error) => {
                  console.error(error);
                  swal("Oops!", "Something went wrong!", "error");
                },
              }
            )
          }
          className={styles.button}
        >
          {isLoading
            ? "Claiming....."
            : claim.isSuccess
            ? "Success Minting!"
            : "Mint NFT 0.00 SOL"}
        </button>
      )}
      <div className={styles.container}>
        <div className="nbtn">
          <p>THIS IS A DEVNET TEST SITE!</p>
          <div className="nbtn2"></div>
        </div>
      </div>
      <div className="footer1">
        <div className="Home_iconContainer1">
          <img src="/sol.png" height={40} width={40} alt="SOLANA" />
        </div>
        <h5 className="footer1">
          Developed with ❤️‍🔥 by:{" "}
          <a href="https://twitter.com/bankkroll_eth">Bankkroll</a>
          &nbsp;-&nbsp;<a href="https://bankkroll.xyz">BR Labs</a>
        </h5>
      </div>
    </div>
  );
};

export default Protected;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork("https://api.devnet.solana.com");
  const user = await getUser(req);


{/* Check if user is connected to site, if not return to login */}
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const program = await sdk.getNFTDrop(programAddress);
  const nfts = await program?.getAllClaimed();
  const hasNFT = nfts?.some((nft) => nft.owner === user.address);

{/* Check if user has WL TOKEN, if not forward to /notWL page */}
  if (!hasNFT) {
    return {
      redirect: {
        destination: "/notWL",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
