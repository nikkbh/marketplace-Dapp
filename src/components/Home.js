import React, { useState } from 'react';

const Home = ({ loading, createProduct, purchaseProduct, productList }) => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
    });

    const { name, price } = newProduct;
    const onChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(name, window.web3.utils.toWei(price.toString(), "Ether"));
    };

    if (loading) {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <main className="col-lg-12 d-flex">
                        <div id="loader" className="text-center"> <p className="text-center">Loading...</p> </div>
                    </main>
                </div>
            </div>

        );
    } else {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <main className="col-lg-12 d-flex">
                        <div className="content">
                            <h1>Add Product</h1>
                            <form onSubmit={handleSubmit} className="m-5">
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="productName"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Product Name"
                                        required />
                                </div>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="productPrice"
                                        type="text"
                                        name="price"
                                        value={price}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Product Price"
                                        required />
                                </div>
                                <div className="text-center"><button type="submit" className="btn btn-primary">Add Product</button></div>
                            </form>
                            <h2>Buy Product</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="productList">
                                    {productList.map((product, key) => {
                                        // console.log(product.name);
                                        return (
                                            <tr key={key}>
                                                <th scope="row">{product.id.toString()}</th>
                                                <td>{product.name}</td>
                                                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                                                <td>{product.owner}</td>
                                                <td>
                                                    {!product.purchased
                                                        ? <button
                                                            className="btn btn-primary"
                                                            name={product.id}
                                                            value={product.price}
                                                            onClick={(e) => {
                                                                purchaseProduct(e.target.name, e.target.value)
                                                            }}
                                                        >
                                                            Buy
                                                      </button>
                                                        : <button className="btn btn-success">Owned</button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Home;