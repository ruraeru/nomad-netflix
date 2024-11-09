import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
    const popularMatch = useMatch("/");
    const soonMatch = useMatch("/coming-soon");
    const nowMatch = useMatch("/now-playing");
    const navAnimation = useAnimation();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", () => {
        if (scrollY.get() > 60) {
            navAnimation.start("scroll")
        }
        else {
            navAnimation.start("top")
        }
    });

    return (
        <Nav
            variants={navVariants}
            animate={navAnimation}
            initial={{ backgroundColor: "rgba(0,0,0,0)", color: "rgba(255,255,255,1)" }}
        >
            <Items>
                <Item>
                    <Link to="/">
                        popular {popularMatch && <Circle layoutId="circle" />}
                    </Link>
                </Item>
                <Item>
                    <Link to="/coming-soon">
                        coming soon {soonMatch && <Circle layoutId="circle" />}
                    </Link>
                </Item>
                <Item>
                    <Link to="/now-playing">
                        now playing {nowMatch && <Circle layoutId="circle" />}
                    </Link>
                </Item>
            </Items>
        </Nav>
    )
}

const Nav = styled(motion.nav)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;

    z-index: 998;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Items = styled.ul`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
`;

const Item = styled.li`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  bottom: -12px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "rgba(255,255,255,1)"
    },
    scroll: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        color: "rgba(0,0,0,1)"
    }
}