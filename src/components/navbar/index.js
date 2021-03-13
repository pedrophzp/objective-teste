import React from "react";
import ObjectiveLogo from "../../images/objective-logo.png";
import Text from "../text";
import styles from "./index.module.scss";

const Navbar = () => {
  return (
    <div className={styles.containerNavbar}>
      <img
        className={styles.navbarLogoObjective}
        alt={"objective logo"}
        src={ObjectiveLogo}
      />
      <div className={styles.containerCandidate}>
        <Text className={"infoCandidateBold"}>Pedro Henrique Zagato Pupin</Text>
        <Text className={"infoCandidate"}>Teste de Front-end</Text>
      </div>
      <div className={styles.menu}>
        <Text className={"menu"}>CB</Text>
      </div>
    </div>
  );
};

export default Navbar;
