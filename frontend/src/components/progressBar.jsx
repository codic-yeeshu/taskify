import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      className={styles.progressCircle}
      style={{
        "--percentage": percentage,
      }}
    >
      <span
        className={styles.circleBackground}
        style={{
          background: `conic-gradient(var(--primary) ${percentage}%, var(--secondary) 0)`, // Dynamically update the gradient
        }}
      ></span>
      <span className={styles.percentageText}>{percentage}%</span>
    </div>
  );
};

export default ProgressBar;
