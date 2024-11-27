import { useState, useEffect } from "react";
import Button from "./components/Button";

const url = "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json";

function App() {
    const [data, setData] = useState([]); // Todos los datos originales
    const [filteredData, setFilteredData] = useState([]); // Datos para renderizar
    const [activeButton, setActiveButton] = useState("first");

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result); // Guarda todos los datos
                setFilteredData(result); // Inicialmente muestra todos los productos
            } catch (error) {
                console.log(error);
            }
        };
        fetchAPI();
    }, []);

    function renderProducts(arr) {
        return arr.map((product) => {
            const { name, id, image, price, rating, votes, popular, available } = product;
            return (
                <article className="products__card" key={id}>
                    <figure className="products__card-fig">
                        <img className="products__card-image" src={image} alt={name} />
                        {popular && <figcaption className="products__card-popular">popular</figcaption>}
                    </figure>

                    <header className="products__card-header">
                        <h3 className="products__card-name">{name}</h3>
                        <p className="products__card-price">{price}</p>
                    </header>

                    <footer className="products__card-footer">
                        <div className="products__card-rate">
                            <p className="products__card-rating">{rating && `Rating: ${rating}`}</p>
                            <p className="products__card-votes">{rating ? `(${votes} votes)` : "No Ratings"}</p>
                        </div>
                        {!available && <p className="products__card-sold">Sold Out</p>}
                    </footer>

                </article>
            );
        });
    }

    function showAllProducts() {
        setFilteredData(data); // Restaura todos los productos
    }

    function filterAvailableProducts() {
        const availableProducts = data.filter((product) => product.available);
        setFilteredData(availableProducts); // Filtra solo los productos disponibles
    }

    function activeBtn(btn) {
        setActiveButton(btn)
    }

    return (
        <>
            <main className="main main--container">
                <div className="main__content">
                    <h1 className="main__content-title">Our Collection</h1>
                    <p className="main__content-text">Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.</p>
                    <div className="main__buttons">
                        <Button
                            text={"All Products"}
                            handleFunction={() => { showAllProducts(), activeBtn(), activeBtn("first") }}
                            classes={`main__button ${activeButton === "first" ? "main__button--active" : ""}`}
                        />
                        <Button
                            text={"Available Now"}
                            handleFunction={() => { filterAvailableProducts(), activeBtn(), activeBtn("second") }}
                            classes={`main__button ${activeButton === "second" ? "main__button--active" : ""}`}
                        />
                    </div>
                </div>
                <div className="products products--container">
                    {renderProducts(filteredData)} {/* Renderiza los productos filtrados */}
                </div>
            </main>
        </>
    );
}

export default App;
