import { useEffect } from "react";
import "../../index.css";
import styles from "./app.module.css";

import { AppHeader, Modal, OrderInfo, IngredientDetails } from "@components";
import { Route, Routes, useLocation } from "react-router-dom";
import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from "@pages";
import { closeModal, fetchIngredients, selectIngredients, selectIsModalOpened } from "../../slices/constructorSlice";
import { useDispatch, useSelector } from "../../services/store";
import { getCookie } from "../../utils/cookie";
import { getUserThunk, init, selectIsAuthenticated } from "../../slices/userSlice";
import { fetchFeed, selectOrders } from "../../slices/feedSlice";
import { ProtectedRoute } from "../protected-route";

const token = getCookie("accessToken");

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const backgroundLocation = location.state?.background;
    const isModalOpened = useSelector(selectIsModalOpened);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const ingredients = useSelector(selectIngredients);
    const feed = useSelector(selectOrders);

    useEffect(() => {
        if (!isAuthenticated && token) {
            dispatch(getUserThunk()).then(() => dispatch(init()));
        } else {
            dispatch(init());
        }
        if (!ingredients.length) {
            dispatch(fetchIngredients());
        }

        if (!feed.length) {
            dispatch(fetchFeed());
        }
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />

            <Routes location={backgroundLocation || location}>
                <Route path="*" element={<NotFound404 />} />
                <Route path="/" element={<ConstructorPage />} />
                <Route path="/feed" element={<Feed />} />

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute unAuthOnly>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute unAuthOnly>
                            <Register />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRoute unAuthOnly>
                            <ForgotPassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRoute unAuthOnly>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile/orders"
                    element={
                        <ProtectedRoute>
                            <ProfileOrders />
                        </ProtectedRoute>
                    }
                />
                <Route path="/feed/:number" element={<OrderInfo />} />
                <Route path="/ingredients/:id" element={<IngredientDetails />} />
                <Route
                    path="/profile/orders/:number"
                    element={
                        <ProtectedRoute>
                            <OrderInfo />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {isModalOpened && backgroundLocation && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal
                                title={"Описание ингредиента"}
                                onClose={() => {
                                    dispatch(closeModal());
                                }}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:number"
                        element={
                            <ProtectedRoute>
                                <Modal
                                    title={"Заказ"}
                                    onClose={() => {
                                        dispatch(closeModal());
                                    }}>
                                    <OrderInfo />
                                </Modal>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/feed/:number"
                        element={
                            <Modal
                                title={"Заказ"}
                                onClose={() => {
                                    dispatch(closeModal());
                                }}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
