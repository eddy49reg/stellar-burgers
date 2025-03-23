import { FC, useMemo } from "react";
import { TIngredient } from "@utils-types";
import { BurgerConstructorUI } from "@ui";
import { useDispatch, useSelector } from "../../services/store";
import { useNavigate } from "react-router-dom";
import {
    closeOrderRequest,
    fetchNewOrder,
    selectConstructorItems,
    selectOrderModalData,
    selectOrderRequest,
} from "../../slices/constructorSlice";
import { selectIsAuthenticated } from "../../slices/userSlice";

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const orderRequest = useSelector(selectOrderRequest);
    const constructorItems = useSelector(selectConstructorItems);
    const orderModalData = useSelector(selectOrderModalData);

    const onOrderClick = () => {
        if (!isAuthenticated) {
            return navigate("/login", { replace: true });
        }

        if (constructorItems.bun._id && constructorItems.ingredients.length) {
            const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
            dispatch(fetchNewOrder([constructorItems.bun._id, ...ingredientsIds, constructorItems.bun._id]));
        }
    };
    const closeOrderModal = () => {
        dispatch(closeOrderRequest());
    };

    const price = useMemo(
        () =>
            (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
            constructorItems.ingredients.reduce((s: number, v: TIngredient) => s + v.price, 0),
        [constructorItems],
    );

    return (
        <BurgerConstructorUI
            price={price}
            orderRequest={orderRequest}
            constructorItems={constructorItems}
            orderModalData={orderModalData}
            onOrderClick={onOrderClick}
            closeOrderModal={closeOrderModal}
        />
    );
};
