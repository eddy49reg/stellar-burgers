import { FC, useMemo } from "react";
import { OrderInfoUI, Preloader } from "@ui";
import { TIngredient } from "@utils-types";
import { useSelector } from "../../services/store";
import { redirect, useParams } from "react-router-dom";
import { selectOrders } from "../../slices/feedSlice";
import { selectIngredients } from "../../slices/constructorSlice";

export const OrderInfo: FC = () => {
    const params = useParams<{ number: string }>();
    if (!params.number) {
        redirect("/feed");
        return null;
    }

    const orders = useSelector(selectOrders);

    const orderData = orders.find((item) => item.number === parseInt(params.number!));

    const ingredients: TIngredient[] = useSelector(selectIngredients);

    /* Готовим данные для отображения */
    const orderInfo = useMemo(() => {
        if (!orderData || !ingredients.length) return null;

        const date = new Date(orderData.createdAt);

        type TIngredientsWithCount = {
            [key: string]: TIngredient & { count: number };
        };

        const ingredientsInfo = orderData.ingredients.reduce((acc: TIngredientsWithCount, item) => {
            if (!acc[item]) {
                const ingredient = ingredients.find((ing) => ing._id === item);
                if (ingredient) {
                    acc[item] = {
                        ...ingredient,
                        count: 1,
                    };
                }
            } else {
                acc[item].count++;
            }

            return acc;
        }, {});

        const total = Object.values(ingredientsInfo).reduce((acc, item) => acc + item.price * item.count, 0);

        return {
            ...orderData,
            ingredientsInfo,
            date,
            total,
        };
    }, [orderData, ingredients]);

    if (!orderInfo) {
        return <Preloader />;
    }

    return <OrderInfoUI orderInfo={orderInfo} />;
};
