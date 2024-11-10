export const movieWrapperVariants = {
    start: { opacity: 0, scale: 0.5 },
    end: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            duration: 0.1,
            bounce: 0.5,
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
};

export const movieVariants = {
    start: { opacity: 0, y: 10, scale: 0.1 },
    end: { opacity: 1, y: 0, scale: 1 }
};