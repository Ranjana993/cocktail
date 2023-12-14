import React, { useState, useEffect } from "react";
import Layout from "./../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../Redux/features/cocktailSlice";
import SpinnerAnim from "../Components/shared/SpinnerAnim";
import { Link } from "react-router-dom";
import SearchBox from "../Components/SearchBox";

const HomePage = () => {
  const [modifiedCocktails, setmodifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);
  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strAlcoholic, strDrinkThumb, strGlass, strDrink } =
          item;
        return {
          id: idDrink,
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setmodifiedCocktails(newCocktails);
    } else {
      setmodifiedCocktails([]);
    }
  }, [cocktails]);
  if (loading) {
    return <SpinnerAnim />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!cocktails) {
    return (
      <Layout>
        <h2>No Cocktail Found With THis Name</h2>
      </Layout>
    );
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {
            modifiedCocktails.map((item) => (
              <div className="col-md-2 mt-2 m-3 borderCard" key={item.id}>
                <div className="card" style={{ width: "14rem" }}>
                  <img src={item.img} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h5 className="card-title">{item.glass}</h5>
                    <p className="card-text">{item.info}</p>
                    <Link to={`/products/${item.id}`} className="btn btn-primary">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default HomePage;
