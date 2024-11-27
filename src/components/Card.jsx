function Card({product}) {
    const { name, image, price, rating, votes, popular, available } = product;

    return (
        <article className="products__card">
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
}

export default Card;