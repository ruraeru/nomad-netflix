import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { keywordState } from "../atom";
import { useForm } from "react-hook-form";
import { iconVariants, inputVariants, logoVariants, navVariants } from "../variants/HeaderVariants";

interface IForm {
    keyword: string;
}

export default function Header() {
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const popularMatch = useMatch("/");
    const soonMatch = useMatch("/coming-soon");
    const nowMatch = useMatch("/now-playing");

    const navAnimation = useAnimation();
    const inputAnimation = useAnimation();
    const iconAnimation = useAnimation();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", () => {
        if (scrollY.get() > 60) {
            navAnimation.start("scroll")
            inputAnimation.start("scroll");
            iconAnimation.start("scroll");

        }
        else {
            navAnimation.start("top")
            inputAnimation.start("top");
            iconAnimation.start("top");
        }
    });

    const setKeyword = useSetRecoilState(keywordState);
    const onValid = (data: IForm) => {
        setKeyword(data.keyword);
        setValue("keyword", "");
    }

    return (
        <Nav
            variants={navVariants}
            animate={navAnimation}
            initial={{ backgroundColor: "rgba(0,0,0,0)", color: "rgba(255,255,255,1)" }}
        >
            <Col>
                <Logo to="/">
                    <motion.img
                        variants={logoVariants}
                        initial="normal"
                        whileHover="active"
                        src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPvCm%2FbtssHjrybxe%2FKeTYFcZAoHvSL4GjkaXda1%2Fimg.png"
                        alt="logo"
                    />
                </Logo>
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
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        variants={iconVariants}
                        animate={iconAnimation}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        variants={inputVariants}
                        animate={inputAnimation}
                        initial={{
                            backgroundColor: "rgba(0,0,0,0)", border: "3px solid rgba(255, 255, 255, 1)"
                        }}
                        {...register("keyword")}
                        type="text"
                        placeholder="movie name"
                    />
                </Search>
            </Col>
        </Nav>
    )
}

const Nav = styled(motion.nav)`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const Col = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(Link)`
    margin: 0 20px 0 20px;
    img {
        width: 50px;
        height: 50px;
    }
`;

const Items = styled.ul`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const Item = styled.li`
    margin-right: 20px;
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:hover {
        color: red;
    }
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

const Search = styled.form`
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    margin-right: 15px;
    position: relative;
    svg {
        height: 25px;
        position: absolute;
        right: 185px;
    }
`;

const Input = styled(motion.input)`
    position: absolute;
    right: 0;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 1);
    &:focus {
        outline: none;
    }
`;