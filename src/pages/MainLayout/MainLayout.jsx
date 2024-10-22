import React, { useEffect, useState } from "react";
import css from "./MainLayout.module.css";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    navigate("/home");
  };

  return (
    <div className={css.mainlayout}>
      {loading ? (
        <Logo variant="main" icon="iconMain" />
      ) : (
        <Loader onComplete={handleComplete} />
      )}
    </div>
  );
};

export default MainLayout;
