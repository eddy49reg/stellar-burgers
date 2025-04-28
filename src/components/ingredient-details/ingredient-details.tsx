import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "../../services/store";
import { selectIngredients } from "../../slices/constructorSlice";
import { IngredientDetailsUI, Preloader } from "@ui";

export const IngredientDetails: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    useEffect(() => {
        if (!params.id) {
            navigate("/", { replace: true });
        }
    }, []);

    const ingredients = useSelector(selectIngredients);
    const ingredientData = ingredients.find((item) => item._id === params.id);

    if (!ingredientData) {
        return <Preloader />;
    }

    return <IngredientDetailsUI ingredientData={ingredientData} />;
};
