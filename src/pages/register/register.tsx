import { FC, SyntheticEvent, useEffect } from "react";
import { RegisterUI } from "@ui-pages";
import { Preloader } from "@ui";
import { fetchRegisterUser, getUserThunk, removeErrorText, selectLoading, selectErrorText } from "../../slices/userSlice";
import { useDispatch, useSelector } from "../../services/store";
import { useForm } from "../../hooks/useForm";
import { TRegisterData } from "@api";

export const Register: FC = () => {
    const { values, handleChange } = useForm<TRegisterData>({
        name: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectErrorText);

    useEffect(() => {
        dispatch(removeErrorText());
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(fetchRegisterUser(values)).then(() => dispatch(getUserThunk()));
    };

    if (isLoading) {
        return <Preloader />;
    }
    return (
        <RegisterUI
            errorText={error}
            email={values.email}
            userName={values.name}
            password={values.password}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};
