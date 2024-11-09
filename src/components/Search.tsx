import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { keywordState } from "../atom";

const Wrapper = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    input {
        width: 100%;
        margin: 0 20px 0 20px;
        height: 100px;
        border-radius: 15px;
        background-color: transparent;
        border: 3px solid white;
        color: white;
        font-size: 32px;
        text-align: center;

        &:focus {
            outline: none;
        }
    }
`;

interface IForm {
    keyword: string;
}

export default function Search() {
    const { register, handleSubmit } = useForm<IForm>();
    const setKeyword = useSetRecoilState(keywordState);
    const onValid = (data: IForm) => {
        setKeyword(data.keyword);
    }
    return (
        <Wrapper onSubmit={handleSubmit(onValid)}>
            <input
                {...register("keyword")}
                type="text"
                placeholder="movie name"
            />
        </Wrapper>
    )
}