import { FC, memo } from "react";
import { BurgerConstructorElementUI } from "@ui";
import { BurgerConstructorElementProps } from "./type";
import { useDispatch } from "../../services/store";
import { deleteIngredient, moveIngredientDown, moveIngredientUp } from "../../slices/constructorSlice";

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
        // @ts-ignore
        dispatch(moveIngredientDown(ingredient));
    };

    const handleMoveUp = () => {
        // @ts-ignore
        dispatch(moveIngredientUp(ingredient));
    };

    const handleClose = () => {
        // @ts-ignore
        dispatch(deleteIngredient(ingredient));
    };

    return (
        <BurgerConstructorElementUI
            ingredient={ingredient}
            index={index}
            totalItems={totalItems}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleClose={handleClose}
        />
    );
});
