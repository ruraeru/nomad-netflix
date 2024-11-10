export const logoVariants = {
  normal: {
    rotateZ: 0,
    scale: 1,
  },
  active: {
    rotateZ: 360,
    scale: 1.2,
    transition: {
      repeat: Infinity,
    },
  },
};

export const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(255,255,255,1)",
  },
  scroll: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "rgba(0,0,0,1)",
  },
};

export const inputVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(255,255,255,1)",
    border: "3px solid rgba(255, 255, 255, 1)",
  },
  scroll: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "rgba(0,0,0,1)",
    border: "3px solid rgba(0, 0, 0, 1)",
  },
};

export const iconVariants = {
  top: {
    color: "rgba(255,255,255,1)",
  },
  scroll: {
    color: "rgba(0,0,0,1)",
  },
};
