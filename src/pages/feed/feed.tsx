import React, { FC, useEffect } from "react";
import { fetchFeed, removeOrders, selectOrders } from "../../slices/feedSlice";
import { FeedUI } from "@ui-pages";
import { Preloader } from "@ui";
import { TOrder } from "@utils-types";
import { useDispatch, useSelector } from "../../services/store";
import { fetchIngredients } from "../../slices/constructorSlice";

export const Feed: FC = () => {
    const orders: TOrder[] = useSelector(selectOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
    }, []);

    if (!orders.length) {
        return <Preloader />;
    }

    return (
        <FeedUI
            orders={orders}
            handleGetFeeds={() => {
                dispatch(removeOrders());
                dispatch(fetchFeed());
            }}
        />
    );
};
