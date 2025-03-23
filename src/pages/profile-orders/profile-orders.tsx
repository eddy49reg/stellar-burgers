import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { fetchUserOrders, removeUserOrders, selectUserOrders } from "../../slices/orderSlice";
import { Preloader } from "@ui";
import { ProfileOrdersUI } from "@ui-pages";
import { fetchIngredients } from "../../slices/constructorSlice";

export const ProfileOrders: FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(removeUserOrders());
        Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
    }, []);

    if (!orders) {
        return <Preloader />;
    }

    return <ProfileOrdersUI orders={orders} />;
};
