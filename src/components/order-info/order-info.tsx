import { FC, useMemo } from "react";
import { OrderInfoUI, Preloader } from "@ui";
import { TIngredient } from "@utils-types";
import { useSelector } from "../../services/store";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { selectOrders } from "../../slices/feedSlice";
import { selectIngredients } from "../../slices/constructorSlice";

export const OrderInfo: FC = () => {
    const params = useParams<{ number: string }>();
    const location = useLocation();
    const orders = useSelector(selectOrders);
    const ingredients = useSelector(selectIngredients);

    if (!params.number) {
        const basePath = location.pathname.includes("/profile") ? "/profile/orders" : "/feed";
        return <Navigate to={basePath} replace />;
    }

    const orderData = orders.find((item) => item.number === parseInt(params.number!));

    const orderInfo = useMemo(() => {
        if (!orderData || !ingredients.length) {
            return null;
        }

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
