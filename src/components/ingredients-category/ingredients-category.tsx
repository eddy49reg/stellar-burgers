import { forwardRef, useMemo } from "react";
import { TIngredientsCategoryProps } from "./type";
import { IngredientsCategoryUI } from "@ui";
import { TIngredient } from "@utils-types";
import { selectConstructorItems } from "../../slices/constructorSlice";
import { useSelector } from "../../services/store";

export const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategoryProps>(({ title, titleRef, ingredients }, ref) => {
    const burgerConstructor = useSelector(selectConstructorItems);

    const ingredientsCounters = useMemo(() => {
        const { bun, ingredients } = burgerConstructor;
        const counters: { [key: string]: number } = {};
        ingredients.forEach((ingredient: TIngredient) => {
            if (!counters[ingredient._id]) counters[ingredient._id] = 0;
            counters[ingredient._id]++;
        });
        if (bun) counters[bun._id!] = 2;
        return counters;
    }, [burgerConstructor]);

    return (
        <IngredientsCategoryUI
            title={title}
            titleRef={titleRef}
            ingredients={ingredients}
            ingredientsCounters={ingredientsCounters}
            ref={ref}
        />
    );
});
